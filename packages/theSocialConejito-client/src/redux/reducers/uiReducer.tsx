import {LOADING_UI, SET_ERRORS, CLEAR_ERRORS, OPEN_WINDOW_POST_SCREAM, CLOSE_WINDOW_POST_SCREAM, STOP_LOADING_UI, OPEN_DELETE_SCREAM_ALERT, CLOSE_DELETE_SCREAM_ALERT, CANCEL_SET_SCREAM} from '../types/actionTypes/uiTypes';
import { Action } from '../types';

interface UIState {
    loading: boolean;
    errors: any;
    isWindowPostScreamOpen: boolean;
    isDeleteScreamAlertOpen: boolean;
    isSetScreamCanceled: boolean,
}

const initialState : UIState = {
    loading: false,
    errors: {},
    isWindowPostScreamOpen: false,
    isDeleteScreamAlertOpen: false,
    isSetScreamCanceled: false,
}

export default function( state = initialState, action: Action) : UIState {
    switch(action.type){
        case LOADING_UI:
            return {
                ...state,
                loading: true,
                isSetScreamCanceled: false,
            }
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state, 
                loading: false,
                errors: {} 
            }
        case OPEN_WINDOW_POST_SCREAM:
            return {
                ...state,
                isWindowPostScreamOpen: true
            }
        case CLOSE_WINDOW_POST_SCREAM:
            return {
                ...state,
                isWindowPostScreamOpen: false
            }
        case OPEN_DELETE_SCREAM_ALERT:
            return {
                ...state,
                isDeleteScreamAlertOpen: true,
            }
        case CLOSE_DELETE_SCREAM_ALERT:
            return {
                ...state,
                isDeleteScreamAlertOpen: false,
            }
        case CANCEL_SET_SCREAM:
                return {
                    ...state,
                    isSetScreamCanceled: true
                }
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}