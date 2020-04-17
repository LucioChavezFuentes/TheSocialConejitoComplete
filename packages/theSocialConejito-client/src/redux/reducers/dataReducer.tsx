import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, 
    DELETING_SCREAM, DELETE_SCREAM_SUCCESS, DELETE_SCREAM_FAILURE, 
    POST_SCREAM, SET_SCREAM, SUBMIT_COMMENT, LOADING_LIKE, Scream, SUCCESS, FAILURE, NOT_REQUESTED} from '../types/actionTypes/dataTypes'


import { Action } from "../types";


interface DataState {
    screams: {
        [key: string]: Scream
    };
    scream: any;
    screamIds: string[];
    loading: boolean;
    isDeletingScream: boolean;
    deleteScream: {
        status: typeof SUCCESS | typeof FAILURE | typeof NOT_REQUESTED;
        message: string;
    };
}

const initialState : DataState = {
    screams: {}, 
    scream: {},
    screamIds: [],
    loading: false,
    isDeletingScream: false,
    deleteScream: {
        status: NOT_REQUESTED,
        message: ''
    },
    
    
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
                screams: action.payload.entities.screams,
                screamIds: action.payload.result,
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
                screams: {
                    ...state.screams,
                    [action.payload.screamId] : {
                        ...action.payload,
                        loadingLike: false
                    }
                },
                scream: state.scream.screamId === action.payload.screamId ? {...state.scream, ...action.payload, loadingLike: false} : {...state.scream}
                
                /*state.screams.map(scream => {
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
                scream: state.scream.screamId === action.payload.screamId ? {...state.scream, ...action.payload, loadingLike: false} : {...state.scream}*/
            }
        case LOADING_LIKE:
            //TODO: find the correct scream to change the loadingLike to 'true' 
            return {
                ...state,
                screams: {
                    ...state.screams,
                    [action.payload] : {
                        ...state.screams[action.payload],
                        loadingLike: true
                    }
                    
                },
                scream: state.scream.screamId === action.payload ? {...state.scream, loadingLike: true} : {...state.scream}
            }
        case DELETE_SCREAM_SUCCESS:
            /*let indexToDelete = state.screams.findIndex((scream) => scream.screamId === action.payload);
            state.screams.splice(indexToDelete, 1);
            return {
                ...state
            };*/ 
            
            const { [action.payload]: value, ...withoutScream } = state.screams;
            return {
                ...state,
                screams : {
                    ...withoutScream
                    },
                screamIds: state.screamIds.filter(id => {
                    return id !== action.payload
                }),
                isDeletingScream: false,
                deleteScream: {
                    ...state.deleteScream,
                    status: SUCCESS,
                    message: "Your Squeal has been deleted successfully",
                }
            }
        case DELETE_SCREAM_FAILURE:
            return {
                ...state,
                isDeletingScream: false,
                deleteScream: {
                    ...state.deleteScream,
                    status: FAILURE,
                    message: "Can't delete your Squeal, please try again",
                }
            }
        case DELETING_SCREAM:
            return {
                ...state,
                isDeletingScream: true
            }
                
        case POST_SCREAM:
            return {
                ...state,
                screams: {
                    [action.payload.screamId] : {
                        ...action.payload
                    },
                    ...state.screams,
                },
                screamIds: [action.payload.screamId, ...state.screamIds]
            }
            /*return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }*/
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

export function getArrayOfScreams(screams : DataState['screams'], screamIds : string[]) {
    return screamIds.map(id => screams[id])
}