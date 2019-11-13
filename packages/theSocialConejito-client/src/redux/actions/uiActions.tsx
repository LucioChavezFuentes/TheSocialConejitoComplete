
import {CLEAR_ERRORS, CLOSE_WINDOW_POST_SCREAM, OPEN_WINDOW_POST_SCREAM} from '../types/actionTypes/uiTypes';
import {Dispatch} from '../types';

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