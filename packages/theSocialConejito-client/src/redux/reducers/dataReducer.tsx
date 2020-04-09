import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, SET_SCREAM, SUBMIT_COMMENT, LOADING_LIKE} from '../types/actionTypes/dataTypes'


import { Action } from "../types";

interface DataState {
    screams: any[];
    scream: any;
    loading: boolean;

}

const initialState : DataState = {
    screams: [], 
    scream: {},
    loading: false,
    
}

export default function(state = initialState, action: Action) : DataState {
    switch(action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload.map(scream => {
                    return { ...scream, loadingLike: false}
                }),
                loading: false,
            }
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload,
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            //TODO: Fix likeScream action and/or reducer when is dispatched on ScreamDialog Open, 
            //it seems the like scream and unlike scream lose the comments[] property in state
            const newState = {...state}
            let index = newState.screams.findIndex((scream) => scream.screamId === action.payload.screamId)
            newState.screams[index] = {...action.payload, loadingLike: false}
            if(newState.scream.screamId === action.payload.screamId){
                newState.scream = {
                    ...newState.scream,
                    ...action.payload
                }
            }
            return {
                ...newState,
            }
        case LOADING_LIKE:
            //TODO: find the correct scream to change the loadingLike to 'true' 
            return {
                ...state,
                screams: state.screams.map(scream => {
                    return {
                        ...scream,
                        loadingLike: scream.screamId === action.payload ? true : false
                    }
                })
            }
        case DELETE_SCREAM:
            let indexToDelete = state.screams.findIndex((scream) => scream.screamId === action.payload);
            state.screams.splice(indexToDelete, 1);
            return {
                ...state
            };
        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                scream: {
                    ...state.scream,
                    ...action.payload.dataScream,
                    comments: [action.payload.newComment, ...state.scream.comments]
                }
            }; 
        default:
            return state;
    }
    
}