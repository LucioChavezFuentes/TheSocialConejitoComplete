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
                scream: {...action.payload, loadingLike: false},
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            //TODO: Find a way to reduce the complexity to constant in screams []
            return {
                ...state,
                screams: state.screams.map(scream => {
                    if(scream.screamId === action.payload.screamId) {
                        return {
                            ...action.payload,
                            loadingLike: false
                        }
                    } else {
                        return {
                            ...scream
                        }
                    }
                }),
                scream: state.scream.screamId === action.payload.screamId ? {...state.scream, ...action.payload, loadingLike: false} : {...state.scream}
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
                }),
                scream: state.scream.screamId === action.payload ? {...state.scream, loadingLike: true} : {...state.scream}
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