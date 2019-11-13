import {SET_USER, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONS_READ } from '../types/actionTypes/userTypes';
import {LOADING_UI, SET_ERRORS, CLEAR_ERRORS} from '../types/actionTypes/uiTypes';
import axios from 'axios';

//Types
import {Dispatch, UserData, NewUserData} from '../types';
import {History} from 'history';


export const loginUser = (userData : UserData, history: History) => (dispatch : Dispatch) => {
    dispatch({type: LOADING_UI})
    axios.post('/login', userData)
            .then(res => {

                setAuthorizationHeader(res.data.token);
                
                dispatch(getUserData() as any)
                dispatch({type: CLEAR_ERRORS})
                history.push('/')
            })
            .catch((err) => {
                
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            });
};

export const signupUser = (newUserData : NewUserData, history: History) => (dispatch : Dispatch) => {
    dispatch({type: LOADING_UI})
    axios.post('/signup', newUserData)
            .then(res => {

                setAuthorizationHeader(res.data.token);
                
                dispatch(getUserData() as any)
                dispatch({type: CLEAR_ERRORS})
                history.push('/')
            })
            .catch((err) => {
                
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            });
};

export const logoutUser = () => (dispatch:Dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
};

export const getUserData = () => (dispatch: Dispatch) => {
    dispatch({type: LOADING_USER})
    axios.get('/user')
        .then( res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch((error) => console.log(error));
};

export const uploadImage = (formDataImage : FormData) => (dispatch: Dispatch) => {
    dispatch({type: LOADING_USER})
    
    axios.post('/user/image', formDataImage )
        .then(() => {
            dispatch(getUserData() as any);
        })
        .catch((error) => console.log(error));
    
};

export const editUserDetails = (userDetails : any) => (dispatch: Dispatch) => {
    dispatch({type: LOADING_USER})
    axios.post('/user', userDetails)
        .then(() => {
            dispatch(getUserData() as any)
        })
        .catch((err) => console.log(err))
};

export const markNotificationsRead = (notificationsIds: any) => (dispatch: Dispatch) => {
    axios.post(`/notifications`, notificationsIds)
        .then(() => {
            dispatch({
                type: MARK_NOTIFICATIONS_READ
            })
        })
        .catch((error) => console.log(error))
};

const setAuthorizationHeader = (token: string) => {
    const FBIdToken = `Bearer ${token}`;
                localStorage.setItem('FBIdToken', FBIdToken);
                axios.defaults.headers.common['Authorization'] = FBIdToken
};