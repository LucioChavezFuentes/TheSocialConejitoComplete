export const SET_ERRORS = 'SET_ERRORS';
export const LOADING_UI = 'LOADING_UI';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const OPEN_WINDOW_POST_SCREAM = 'OPEN_WINDOW_POST_SCREAM';
export const CLOSE_WINDOW_POST_SCREAM = 'CLOSE_WINDOW_POST_SCREAM';
export const OPEN_DELETE_SCREAM_ALERT = 'OPEN__DELETE_SCREAM_ALERT';
export const CLOSE_DELETE_SCREAM_ALERT = 'CLOSE__DELETE_SCREAM_ALERT';
export const CANCEL_SET_SCREAM = 'CANCEL_SET_SCREAM';
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

export interface OPEN_DELETE_SCREAM_ALERT {
    type: typeof OPEN_DELETE_SCREAM_ALERT 
}

export interface CLOSE_DELETE_SCREAM_ALERT {
    type: typeof CLOSE_DELETE_SCREAM_ALERT
}

export interface CANCEL_SET_SCREAM {
    type: typeof CANCEL_SET_SCREAM;
}

export interface STOP_LOADING_UI{
    type: typeof STOP_LOADING_UI
}

type UiActions = SET_ERRORS | 
    LOADING_UI | 
    CLEAR_ERRORS |
    OPEN_WINDOW_POST_SCREAM |
    CLOSE_WINDOW_POST_SCREAM |
    OPEN_DELETE_SCREAM_ALERT |
    CLOSE_DELETE_SCREAM_ALERT |
    STOP_LOADING_UI

export default UiActions