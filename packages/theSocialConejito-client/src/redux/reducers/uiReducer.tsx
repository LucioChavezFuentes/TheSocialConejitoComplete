import {LOADING_UI, SET_ERRORS, CLEAR_ERRORS, OPEN_WINDOW_POST_SCREAM, CLOSE_WINDOW_POST_SCREAM, STOP_LOADING_UI} from '../types/actionTypes/uiTypes';
import { Action } from '../types';

const initialState = {
    loading: false,
    errors: {},
    isWindowPostScreamOpen: false,
    isDeleteScreamAlertOpen: false
}

export default function( state = initialState, action: Action) {
    switch(action.type){
        case LOADING_UI:
            return {
                ...state,
                loading: true,

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
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}