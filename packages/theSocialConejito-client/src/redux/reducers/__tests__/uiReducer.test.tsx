import uiReducer from '../uiReducer';
import * as uiTypes from '../../types/actionTypes/uiTypes';
import {initialState} from '../uiReducer';

describe('uiReducer', () => {

    test('LOADING_UI case', () => {

        expect(uiReducer(undefined, {
            type: uiTypes.LOADING_UI
            }
        )).toEqual({
            ...initialState,
            loading: true
        })
    });

    test('STOP_LOADING_UI case', () => {

        const firstState = {
            ...initialState,
            loading: true
        }

        expect(uiReducer({...firstState}, {
            type: uiTypes.STOP_LOADING_UI
            }
        )).toEqual({
            ...initialState,
            loading: false
        })
    });

    test('SET_ERRORS case', () => {

        const payload = {
            email : 'Can not be empty'
        }

        const firstState = {
            ...initialState,
            loading: true,
        }

        expect(uiReducer({...firstState}, {
            type: uiTypes.SET_ERRORS,
            payload
        }
        )).toEqual({
            ...initialState,
            loading: false,
            errors : {
                ...payload
            }
        })
    });

    test('CLEAR_ERRORS case', () => {

        const firstState = {
            ...initialState,
            loading: true,
            errors: {
                email: 'Can not be empty'
            }
        }

        expect(uiReducer({...firstState}, {
            type: uiTypes.CLEAR_ERRORS,
        }
        )).toEqual({
            ...initialState,
            loading: false,
            errors : {}
        })
    });

    test('OPEN_WINDOW_POST_SCREAM case', () => {

        expect(uiReducer({...initialState}, {
            type: uiTypes.OPEN_WINDOW_POST_SCREAM,
        }
        )).toEqual({
            ...initialState,
            isWindowPostScreamOpen: true
        })
    });

    test('CLOSE_WINDOW_POST_SCREAM case', () => {

        const firstState = {
            ...initialState,
            isWindowPostScreamOpen: true
        }

        expect(uiReducer({...firstState}, {
            type: uiTypes.CLOSE_WINDOW_POST_SCREAM,
        }
        )).toEqual({
            ...initialState,
            isWindowPostScreamOpen: false
        })
    });

    test('OPEN_DELETE_SCREAM_ALERT case', () => {

        expect(uiReducer({...initialState}, {
            type: uiTypes.OPEN_DELETE_SCREAM_ALERT,
        }
        )).toEqual({
            ...initialState,
            isDeleteScreamAlertOpen: true
        })
    });

    test('CLOSE_DELETE_SCREAM_ALERT case', () => {

        const firstState = {
            ...initialState,
            isDeleteScreamAlertOpen: true
        }

        expect(uiReducer({...firstState}, {
            type: uiTypes.CLOSE_DELETE_SCREAM_ALERT,
        }
        )).toEqual({
            ...initialState,
            isDeleteScreamAlertOpen: false
        })
    });

    test('CANCEL_SET_SCREAM case', () => {

        expect(uiReducer({...initialState}, {
            type: uiTypes.CANCEL_SET_SCREAM,
        }
        )).toEqual({
            ...initialState,
        })
    });



})