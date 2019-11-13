import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, SET_SCREAM, SUBMIT_COMMENT} from '../types/actionTypes/dataTypes'
import {LOADING_UI, SET_ERRORS, CLEAR_ERRORS, CLOSE_WINDOW_POST_SCREAM, STOP_LOADING_UI} from '../types/actionTypes/uiTypes';
import {Dispatch} from '../types';
import axios from 'axios';
import { clearErrors } from './uiActions';

interface commentData {
    body: string
}

//Get all Screams
export const getScreams = () => (dispacth : Dispatch) => {
    dispacth({type: LOADING_DATA});

    axios.get('/screams')
        .then( res => {
            dispacth({
                type:SET_SCREAMS,
                payload: res.data
            })
        })
        .catch((error) => {
            dispacth({
                type:SET_SCREAMS,
                payload: [] 
            })
        })
};

//Get One Scream
export const getScream = (screamId: string) => (dispatch: Dispatch) => {
    dispatch({type: LOADING_UI});

    axios.get(`/scream/${screamId}`)
        .then( res => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            })
            dispatch({type: STOP_LOADING_UI})
        })
        .catch(error => {
            console.log(error)
        });
};

//PostScream
export const postScream = (newScream: any) => (dispatch: Dispatch) => {
    dispatch({type: LOADING_UI})

    axios.post('/scream', newScream)
        .then(res => {
            dispatch({
                type:POST_SCREAM,
                payload: res.data
            })
            dispatch({ type: CLEAR_ERRORS});
            dispatch({type: CLOSE_WINDOW_POST_SCREAM});
        })
        .catch(error => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            })
        })

};

// Like a Scream
export const likeScream = (screamId : string) => (dispatch: Dispatch) => {

    axios.get(`/scream/${screamId}/like`)
        .then((res) => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(error => console.log(error) )
};

// Unlike a Scream
export const unlikeScream = (screamId : string) => (dispatch: Dispatch) => {

    axios.get(`/scream/${screamId}/unlike`)
        .then((res) => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(error => console.log(error) ) 
};

export const submitComment = (screamId: string, commentData: commentData) => (dispatch: Dispatch) => {
    axios.post(`/scream/${screamId}/comment`, commentData)
        .then( res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            })
            dispatch(clearErrors() as any);
        })
        .catch(error => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data 
            })
        })
    
}

//Delete Scream
export const deleteScream = (screamId: string) => (dispatch: Dispatch) => {
    axios.delete(`/scream/${screamId}`)
        .then(() => {
            dispatch({
                type: DELETE_SCREAM, 
                payload: screamId})
        })
        .catch(error => console.log(error))
};

export const getUserDataAndScreams = (userHandle: string) => (dispatch: Dispatch) => {
    dispatch({type: LOADING_DATA});
    axios.get(`/user/${userHandle}`)
        .then(res => {
            dispatch({
                type:SET_SCREAMS,
                payload: res.data.screams
            })
        })
        .catch(() => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
                
            })
        } )
}

