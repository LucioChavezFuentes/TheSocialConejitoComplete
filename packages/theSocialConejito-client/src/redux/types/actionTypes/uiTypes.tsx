export const SET_ERRORS = 'SET_ERRORS';
export const LOADING_UI = 'LOADING_UI';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const OPEN_WINDOW_POST_SCREAM = 'OPEN_WINDOW_POST_SCREAM';
export const CLOSE_WINDOW_POST_SCREAM = 'CLOSE_WINDOW_POST_SCREAM';
export const STOP_LOADING_UI = 'STOP_LOADING_UI';

export interface SET_ERRORS {
    type: typeof SET_ERRORS;
    payload: any
}

export interface LOADING_UI {
    type: typeof LOADING_UI
}

export interface CLEAR_ERRORS {
    type: typeof CLEAR_ERRORS
} 

export interface OPEN_WINDOW_POST_SCREAM {
    type: typeof  OPEN_WINDOW_POST_SCREAM 
}

export interface CLOSE_WINDOW_POST_SCREAM {
    type: typeof CLOSE_WINDOW_POST_SCREAM
}

export interface STOP_LOADING_UI{
    type: typeof STOP_LOADING_UI
}

type UiActions = SET_ERRORS | 
    LOADING_UI | 
    CLEAR_ERRORS |
    OPEN_WINDOW_POST_SCREAM |
    CLOSE_WINDOW_POST_SCREAM |
    STOP_LOADING_UI

export default UiActions