import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, SET_SCREAM, SUBMIT_COMMENT} from '../types/actionTypes/dataTypes'


import { Action } from "../types";

interface DataState {
    screams: any[];
    scream: any;
    loading: boolean;
}

const initialState : DataState = {
    screams: [], 
    scream: {},
    loading: false
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
                screams: action.payload,
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
            let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId)
            state.screams[index] = action.payload
            if(state.scream.screamId === action.payload.screamId){
                state.scream = {
                    ...state.scream,
                    ...action.payload}  
            }
            return {
                ...state
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