import userReducer from '../userReducer';
import * as dataTypes from '../../types/actionTypes/userTypes';
import {initialState} from '../userReducer';

describe('userReducer', () => {

    test('SET_AUTHENTICATED case', () => {

        expect(userReducer(undefined, {
            type: dataTypes.SET_AUTHENTICATED
            }
        )).toEqual({
            ...initialState,
            authenticated: true
        })
    });

    test('SET_UNAUTHENTICATED case', () => {

        const firstState = {
            ...initialState,
            authenticated: true
        }

        expect(userReducer({...firstState}, {
            type: dataTypes.SET_UNAUTHENTICATED
            }
        )).toEqual({
            ...firstState,
            authenticated: false,
        })
    });

    test('SET_USER case', () => {

        const payload = {

            credentials: {
                createdAt:"2019-10-08T20:09:44.728Z",
                handle:"chiquillokun",
                email:"chiquillo@kun.com",
            },

            likes: [{
                screamId: '0',
                userHandle: 'user01'

            },{
                screamId: '2',
                userHandle: 'user01'
            }],

            notifications: [{
                recipient: "user22",
                screamId: "9PvlPl0hFPrISjaaxr5x",
                sender: "chiquillokun",
                createdAt :"2019-10-28T20:58:45.408Z",
            }]

            
        }

        expect(userReducer({...initialState}, {
            type: dataTypes.SET_USER,
            payload
            }
        )).toEqual({
            ...initialState,
            authenticated: true,
            loading: false,
            credentials: {
                ...payload.credentials
            },
            likes: [
                ...payload.likes
            ],
            notifications: [
                ...payload.notifications
            ]
        })
    });

    test('LOADING_USER case', () => {

        expect(userReducer({...initialState}, {
            type: dataTypes.LOADING_USER,
            }
        )).toEqual({
            ...initialState,
            loading: true,
        })
    });

    test('LIKE_SCREAM case', () => {

        const payload = {
            screamId: '4',
            userHandle: 'user01'
        }

        const firstState = {
            ...initialState,
            credentials: {
                createdAt:"2019-10-08T20:09:44.728Z",
                handle:"user01",
            },

            likes: [{
                screamId: '0',
                userHandle: 'user01'

            },{
                screamId: '2',
                userHandle: 'user01'
            }],

            notifications: [{
                recipient: "user22",
                screamId: "9PvlPl0hFPrISjaaxr5x",
                sender: "chiquillokun",
                createdAt :"2019-10-28T20:58:45.408Z",
            }]
        }

        expect(userReducer({...firstState}, {
            type: dataTypes.LIKE_SCREAM,
            payload,
            }
        )).toEqual({
            ...firstState,
            likes: [
                ...firstState.likes,
                {...payload}
            ]
        })
    });

    test('UNLIKE_SCREAM case', () => {

        const payload = {
            screamId: '0',
            body: 'Hello everyone, how are you doing today?',
        }

        const firstState = {
            ...initialState,
            credentials: {
                createdAt:"2019-10-08T20:09:44.728Z",
                handle:"user01",
            },

            likes: [{
                screamId: '0',
                userHandle: 'user01'

            },{
                screamId: '2',
                userHandle: 'user01'
            }],
        }

        expect(userReducer({...firstState}, {
            type: dataTypes.UNLIKE_SCREAM,
            payload,
            }
        )).toEqual({
            ...firstState,
            likes: [{
                screamId: '2',
                userHandle: 'user01'
            }]
        })
    });

    test('LIKE_SCREAM case', () => {

        const payload = {
            screamId: '4',
            userHandle: 'user01'
        }

        const firstState = {
            ...initialState,
            credentials: {
                createdAt:"2019-10-08T20:09:44.728Z",
                handle:"user01",
            },

            notifications: [{
                recipient: "user22",
                screamId: "9PvlPl0hFPrISjaaxr5x",
                sender: "chiquillokun",
                createdAt :"2019-10-28T20:58:45.408Z",
                read: false,
            }, {
                recipient: "user22",
                sender: "chiquillokun",
                screamId: "9PvlPl0hFPrISjaaxr5x",
                createdAt :"2019-11-29T20:57:43.408Z",
                read: false,
                
            }],
        }

        expect(userReducer({...firstState}, {
            type: dataTypes.MARK_NOTIFICATIONS_READ,
            }
        )).toEqual({
            ...firstState,
            notifications: firstState.notifications.map(notif => {
                return {
                    ...notif,
                    read: true
                }
            })
        })
    });


})