import {SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONS_READ } from '../types/actionTypes/userTypes';
import { Action } from '../types';
import { LIKE_SCREAM, UNLIKE_SCREAM } from '../types/actionTypes/dataTypes';

//Types
interface UserReducer {
    authenticated: boolean;
    credentials: any;
    likes: any[];
    notifications: any[];
    loading: boolean;
}


export const initialState : UserReducer = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    loading: false
}

export default function(state = initialState, action: Action) : UserReducer {
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return initialState;
            
        case SET_USER:
            return {
                loading: false,
                authenticated: true,
                ...action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ]
            }
        case UNLIKE_SCREAM:
            return {
                ...state,
                likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
            }
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(notif => notif.read = true)
            return {
                ...state
            }
        default: 
            return state
    };
};