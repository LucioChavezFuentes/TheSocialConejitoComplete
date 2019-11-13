export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_UNAUTHENTICATED = 'SET_UNAUTHENTICATED';
export const SET_USER = 'SET_USER';
export const SET_LOADING = 'SET_LOADING';
export const LOADING_USER = 'LOADING_USER';
export const MARK_NOTIFICATIONS_READ = 'MARK_NOTIFICATIONS_READ';

export interface SET_USER {
    type: typeof SET_USER;
    payload: any
}

export interface SET_LOADING {
    type: typeof SET_LOADING
}

export interface SET_AUTHENTICATED{
    type: typeof SET_AUTHENTICATED
}
export interface SET_UNAUTHENTICATED{
    type: typeof SET_UNAUTHENTICATED
}

export interface LOADING_USER{
    type: typeof LOADING_USER
}

export interface MARK_NOTIFICATIONS_READ{
    type: typeof MARK_NOTIFICATIONS_READ
}



type UserActions = SET_USER | 
    SET_LOADING | 
    SET_AUTHENTICATED | 
    SET_UNAUTHENTICATED | 
    LOADING_USER |
    MARK_NOTIFICATIONS_READ

export default UserActions