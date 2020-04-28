import { SET_SCREAMS, SET_SCREAMS_FAILURE, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM_SUCCESS, DELETING_SCREAM, POST_SCREAM, SET_SCREAM, SUBMIT_COMMENT, LOADING_LIKE, ScreamSchema, DELETE_SCREAM_FAILURE, SET_GUEST_USER_DATA, SUBMITTING_COMMENT, CANCEL_GET_USER_GUEST_INFO, CANCEL_SET_SCREAMS} from '../types/actionTypes/dataTypes'
import {LOADING_UI, SET_ERRORS, CLEAR_ERRORS, CLOSE_WINDOW_POST_SCREAM, STOP_LOADING_UI, OPEN_DELETE_SCREAM_ALERT, CANCEL_SET_SCREAM} from '../types/actionTypes/uiTypes';
import {Dispatch, AppState} from '../types';
import axios, {CancelTokenSource} from 'axios';
import { clearErrors } from './uiActions';
import {normalize} from 'normalizr';
import * as schema from '../schema';


interface commentData {
    body: string
}



//Get ALL Screams
export const getScreams = (axiosCancelToken: CancelTokenSource) => (dispatch : Dispatch) => {
    dispatch({type: LOADING_DATA});


    return axios.get('/screams', {cancelToken: axiosCancelToken.token })
        .then( res => {
            
            const normalizedScremas : ScreamSchema = normalize(res.data, schema.arrayOfScreams)
            dispatch({
                type:SET_SCREAMS,
                payload: normalizedScremas
            })
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                dispatch({type: CANCEL_SET_SCREAMS})
                console.log(error.message);
                return
            }
            dispatch({
                type: SET_SCREAMS_FAILURE,
                payload: error 
            })
        })
};

export const cancelGetScreams = (axiosCancelToken: CancelTokenSource) => {
    axiosCancelToken.cancel("SET_SCREAMS Canceled by user's changing page")
}

//Get One Scream
export const getScream = (screamId: string, axiosCancelToken: CancelTokenSource) => (dispatch: Dispatch, getState: () => AppState ) => {
    dispatch({type: LOADING_UI});
    /*const CancelToken = axios.CancelToken;
    const source = CancelToken.source();*/
    axios.get(`/scream/${screamId}`, {cancelToken: axiosCancelToken.token })
        .then( res => {
            //const state = getState()
            //if(!state.ui.isSetScreamCanceled){
                dispatch({
                    type: SET_SCREAM,
                    payload: res.data
                })
            //}
            
            dispatch({type: STOP_LOADING_UI})
        })
        .catch(error => {
            if(axios.isCancel(error)) {
                dispatch({type: CANCEL_SET_SCREAM})
                console.log(error.message);
            }
            console.log(error)
        });
    };

export const cancelSetScream = (cancelSource: CancelTokenSource) => (dispatch: Dispatch) => {
        cancelSource.cancel('Cancel by user')
    }


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
    dispatch({type: LOADING_LIKE, payload: screamId});
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
    dispatch({type: LOADING_LIKE, payload: screamId});
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
    dispatch({
        type: SUBMITTING_COMMENT,
    })
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
    dispatch({type:DELETING_SCREAM})

    axios.delete(`/scream/${screamId}`)
        .then(() => {
            dispatch({
                type: DELETE_SCREAM_SUCCESS, 
                payload: screamId})
            dispatch({type: OPEN_DELETE_SCREAM_ALERT})
        })
        .catch(error => {
            dispatch({
                type: DELETE_SCREAM_FAILURE
            })
            dispatch({type: OPEN_DELETE_SCREAM_ALERT})
            console.log(error)
        })
};

export const getUserDataAndScreams = (userHandle: string, axiosCancelToken: CancelTokenSource) => (dispatch: Dispatch) => {
    dispatch({type: LOADING_DATA});
    axios.get(`/user/${userHandle}`, {cancelToken: axiosCancelToken.token })
        .then(res => {
            //TODO: Find a way to add a test to redux thunks dispatch
            
            dispatch({
                type:SET_GUEST_USER_DATA,
                payload: res.data
            })

        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                dispatch({type: CANCEL_GET_USER_GUEST_INFO})
                console.log(error.message);
                return
            }

            dispatch({
                type: SET_SCREAMS_FAILURE,
                payload: []
                
            })
            console.error(error)
        } )
}

export const cancelGetUserInfo = (axiosCancelToken: CancelTokenSource) => {
    axiosCancelToken.cancel("Cancel by user's changing page")
}

