
import {CLEAR_ERRORS, CLOSE_WINDOW_POST_SCREAM, OPEN_WINDOW_POST_SCREAM, CLOSE_DELETE_SCREAM_ALERT, OPEN_DELETE_SCREAM_ALERT, CANCEL_SET_SCREAM} from '../types/actionTypes/uiTypes';
import {Dispatch} from '../types';
import { CancelTokenSource } from 'axios';


//Clear Errors
export const clearErrors = () => (dispatch: Dispatch) => {
    dispatch({ type: CLEAR_ERRORS});
};

//Open Window to Post Scream
export const openWindowPostScream = () => (dispatch: Dispatch) => {
    dispatch({type: OPEN_WINDOW_POST_SCREAM});
}

export const closeWindowPostScream = () => (dispatch: Dispatch) => {
    dispatch({type: CLOSE_WINDOW_POST_SCREAM});
}

export const closeDeleteScreamAlert = () => (dispatch: Dispatch) => {
    dispatch({type: CLOSE_DELETE_SCREAM_ALERT})
}

export const openDeleteScreamAlert = () => (dispatch: Dispatch) => {
    dispatch({type: OPEN_DELETE_SCREAM_ALERT})
}
