
import {NormalizedSchema} from 'normalizr';

export const SET_SCREAMS = 'SET_SCREAMS';
export const LOADING_DATA = 'LOADING_DATA';
export const LIKE_SCREAM = 'LIKE_SCREAM';
export const UNLIKE_SCREAM = 'UNLIKE_SCREAM';
export const LOADING_LIKE = 'LOADING_LIKE';
export const DELETE_SCREAM = 'DELETE_SCREAM';
export const POST_SCREAM = 'POST_SCREAM';
export const SET_SCREAM = 'SET_SCREAM';
export const SUBMIT_COMMENT = 'SUBMIT_COMMENT';

export interface Scream {
    body: string;
    commentCount: number;
    createdAt: string;
    likeCount: number;
    userHandle: string;
    userImage: string;
    screamId: string;
}

export type ScreamSchema = NormalizedSchema<{
    screams: {
        [key: string]: Scream;
    } | undefined;
}, []>;

export interface SET_SCREAMS {
    type: typeof SET_SCREAMS;
    payload: ScreamSchema | [];
}

export interface SET_SCREAM {
    type: typeof SET_SCREAM;
    payload: any;
}

export interface LOADING_DATA {
    type: typeof LOADING_DATA; 
}

export interface LIKE_SCREAM {
    type: typeof LIKE_SCREAM;
    payload: any
}

export interface UNLIKE_SCREAM {
    type: typeof UNLIKE_SCREAM;
    payload: any
}

export interface LOADING_LIKE {
    type: typeof LOADING_LIKE;
    payload: any
}

export interface DELETE_SCREAM {
    type: typeof DELETE_SCREAM;
    payload: string;
}

export interface POST_SCREAM {
    type: typeof POST_SCREAM;
    payload: any
}

export interface SUBMIT_COMMENT {
    type: typeof SUBMIT_COMMENT;
    payload: any;
}

type DataActions = SET_SCREAMS | 
    LOADING_DATA | 
    LIKE_SCREAM | 
    UNLIKE_SCREAM | 
    DELETE_SCREAM |
    POST_SCREAM |
    SET_SCREAM |
    SUBMIT_COMMENT |
    LOADING_LIKE

export default DataActions;