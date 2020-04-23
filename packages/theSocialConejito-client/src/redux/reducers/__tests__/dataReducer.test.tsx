
import dataReducer from '../dataReducer';
import * as dataTypes from '../../types/actionTypes/dataTypes';
import {initialState} from '../dataReducer';
import {normalize} from 'normalizr';
import * as schema from '../../schema';

describe('dataReducer', () => {

    
    test('dataReducer return initial state', () => {
       expect(dataReducer).toBeDefined()
    })

    test('handle case LOADING_DATA', () => {
        expect(dataReducer(undefined, {
            type: dataTypes.LOADING_DATA
            }
        )).toEqual({
            ...initialState,
            loading: true
        })
    })

    test('handle case SET_SCREAMS', () => {

        const firstPayload = {
            data : [{
                    screamId: '0', body: 'Buenas'
                }, {
                    screamId: '1', body: 'Hola'
                }]
            }
        
        const firstNormalizedScreams : dataTypes.ScreamSchema = normalize(firstPayload.data, schema.arrayOfScreams)

        const firstState = {
            ...initialState,
            screams: firstNormalizedScreams.entities.screams,
            screamIds: firstNormalizedScreams.result,
        }

        expect(dataReducer(undefined, {
            type: dataTypes.SET_SCREAMS,
            payload: firstNormalizedScreams
            }
        )).toEqual({
            ...firstState
        })

        const secondPayload = {
            data : [{
                    screamId: '2', body: 'Buenas monos'
                }, {
                    screamId: '3', body: 'Hola a todos'
                }]
            }
        
        const secondNormalizedScreams : dataTypes.ScreamSchema = normalize(secondPayload.data, schema.arrayOfScreams)


        expect(dataReducer({...firstState}, {
            type: dataTypes.SET_SCREAMS,
            payload: secondNormalizedScreams
            }
        )).toEqual({
            ...firstState,
            screams: secondNormalizedScreams.entities.screams,
            screamIds: secondNormalizedScreams.result,
        })
    });

    test('handle case SET_SCREAM', () => {

        const payload = {
            screamId: '0',
            body: 'Hello everyone, how are you doing today?',
            createdAt: '12/06/20',
            likeCount: '2'
       
        }

        expect(dataReducer({...initialState}, {
            type: dataTypes.SET_SCREAM,
            payload
            }
        )).toEqual({
            ...initialState,
            scream: {...payload, loadingLike: false}
        })
    });

    test('handle case LIKE_SCREAM and UNLIKE_SCREAM', () => {

        const payload = {
            screamId: '0',
            body: 'Hello everyone, how are you doing today?',
            createdAt: '12/06/20',
            likeCount: 2,
            commentCount: 1,
            userHandle: 'user01',
            userImage: 'default',
       
        }

        expect(dataReducer({...initialState}, {
            type: dataTypes.LIKE_SCREAM,
            payload
            }
        )).toEqual({
            ...initialState,
            scream: {},
            screams: {},
            error: 'The system is trying to like a scream is not found in the store',
        })

        const secondPayload = {
            ...payload,
            likeCount: 3
        }

        const firstState = {
            ...initialState,
            scream: {
                ...payload,
                loadingLike: false
            },
            screams: {
                '0': {
                    ...payload,
                    loadingLike: false
                }
            },
            
        }

        expect(dataReducer({...firstState}, {
            type: dataTypes.LIKE_SCREAM,
            payload: secondPayload
            }
        )).toEqual({
            ...firstState,
            scream: {
                ...secondPayload,
                loadingLike: false
            },
            screams: {
                '0' : {
                    ...secondPayload,
                    loadingLike: false
                }
            },
        })

        const secondState = {
            ...firstState,
            scream: {
                ...secondPayload,
                loadingLike: false
            },
            screams: {
                '0' : {
                    ...secondPayload,
                    loadingLike: false
                }
            },
        }

        expect(dataReducer({...secondState}, {
            type: dataTypes.UNLIKE_SCREAM,
            payload
            }
        )).toEqual({
            ...firstState,
        })

        
    });
    test('handle case LOADING_LIKE', () => {

        const payload =  '0';

        const firstState = {
            ...initialState,
            scream: {
                screamId: '0',
                body: 'Hello everyone, how are you doing today?',
                createdAt: '12/06/20',
                likeCount: 2,
                commentCount: 1,
                userHandle: 'user01',
                userImage: 'default',
                loadingLike: false
            },
            screams: {
                '0': {
                    screamId: '0',
                    body: 'Hello everyone, how are you doing today?',
                    createdAt: '12/06/20',
                    likeCount: 2,
                    commentCount: 1,
                    userHandle: 'user01',
                    userImage: 'default',
                    loadingLike: false,
                }
            },
            
        }

        expect(dataReducer({...firstState}, {
            type: dataTypes.LOADING_LIKE,
            payload
            }
        )).toEqual({
            ...firstState,
            scream: {
                ...firstState.scream,
                loadingLike: true
            },
            screams: {
                '0': {
                    ...firstState.screams['0'],
                    loadingLike: true,
                }
            }
        });
    });

    test('handle case DELETE_SCREAM_SUCCESS', () => {

        const payload =  '1';

        const firstState = {
            ...initialState,
            screamIds: ['0', '1', '2'],
            screams: {
                '0': {
                    screamId: '0',
                    body: 'Hello everyone, how are you doing today?',
                    createdAt: '12/06/20',
                    likeCount: 2,
                    commentCount: 1,
                    userHandle: 'user01',
                    userImage: 'default',
                    loadingLike: false,
                },

                '1': {
                    screamId: '1',
                    body: 'My first scream!!',
                    createdAt: '23/01/20',
                    likeCount: 2,
                    commentCount: 1,
                    userHandle: 'user02',
                    userImage: 'default',
                    loadingLike: false,
                },

                '2': {
                    screamId: '2',
                    body: 'How do I post a scream?',
                    createdAt: '15/09/20',
                    likeCount: 0,
                    commentCount: 5,
                    userHandle: 'user03',
                    userImage: 'default',
                    loadingLike: false,
                }
            },
            
        }

        expect(dataReducer({...firstState}, {
            type: dataTypes.DELETE_SCREAM_SUCCESS,
            payload
            }
        )).toEqual({
            ...firstState,
            screamIds: ['0', '2'],
            screams: {
                '0': {
                    ...firstState.screams['0'],
                },
                '2': {
                    ...firstState.screams['2'],
                }
            },
            deleteScream: {
                status: 'SUCCESS',
                message: "Your Squeal has been deleted successfully",
            },
            isDeletingScream: false,
        })
    
    });

    test('handle case DELETE_SCREAM_FAILURE', () => {

        const firstState = {
            ...initialState,
            screamIds: ['0', '1', '2'],
            screams: {
                '0': {
                    screamId: '0',
                    body: 'Hello everyone, how are you doing today?',
                    createdAt: '12/06/20',
                    likeCount: 2,
                    commentCount: 1,
                    userHandle: 'user01',
                    userImage: 'default',
                    loadingLike: false,
                },

                '1': {
                    screamId: '1',
                    body: 'My first scream!!',
                    createdAt: '23/01/20',
                    likeCount: 2,
                    commentCount: 1,
                    userHandle: 'user02',
                    userImage: 'default',
                    loadingLike: false,
                },

                '2': {
                    screamId: '2',
                    body: 'How do I post a scream?',
                    createdAt: '15/09/20',
                    likeCount: 0,
                    commentCount: 5,
                    userHandle: 'user03',
                    userImage: 'default',
                    loadingLike: false,
                }
            },
            
        }

        expect(dataReducer({...firstState}, {
            type: dataTypes.DELETE_SCREAM_FAILURE,
            }
        )).toEqual({
            ...firstState,
            deleteScream: {
                status: 'FAILURE',
                message: "Can't delete your Squeal, please try again",
            },
            isDeletingScream: false,
        })
    
    });

    test('handle case DELETING_SCREAM', () => {

        expect(dataReducer(undefined, {
            type: dataTypes.DELETING_SCREAM,
            }
        )).toEqual({
            ...initialState,
            isDeletingScream: true,
        })
    
    });

    test('handle case POST_SCREAM', () => {

        const payload =  {
            screamId: '45',
            body: 'Hello peolpe, say hi',
            createdAt: '23/04/20',
            likeCount: 0,
            commentCount: 0,
            userHandle: 'user03',
            userImage: 'default',
            loadingLike: false,
        }

        const firstState = {
            ...initialState,
            screamIds: ['0', '1', '2'],
            screams: {
                '0': {
                    screamId: '0',
                    body: 'Hello everyone, how are you doing today?',
                    createdAt: '12/06/20',
                    likeCount: 2,
                    commentCount: 1,
                    userHandle: 'user01',
                    userImage: 'default',
                    loadingLike: false,
                },

                '1': {
                    screamId: '1',
                    body: 'My first scream!!',
                    createdAt: '23/01/20',
                    likeCount: 2,
                    commentCount: 1,
                    userHandle: 'user02',
                    userImage: 'default',
                    loadingLike: false,
                },

                '2': {
                    screamId: '2',
                    body: 'How do I post a scream?',
                    createdAt: '15/09/20',
                    likeCount: 0,
                    commentCount: 5,
                    userHandle: 'user03',
                    userImage: 'default',
                    loadingLike: false,
                }
            },
        }

        expect(dataReducer({...firstState}, {
            type: dataTypes.POST_SCREAM,
            payload
            }
        )).toEqual({
            ...firstState,
            screamIds: ['45','0', '1', '2'],
            screams: {
                ...firstState.screams,
                '45': {
                    ...payload
                }
            }
        })
    });
    
    test('handle case SUBMIT_COMMENT', () => {

        const payload = {
            dataScream: {
                screamId: '0',
                body: 'Hello everyone, how are you doing today?',
                createdAt: '12/06/20',
                likeCount: 2,
                commentCount: 3,
                userHandle: 'user01',
                userImage: 'default',
            },

            newComment: {
                body: "I'm doing great too, thanks",
                screamId: '0',
            }
            
            
        }

        const firstState = {
            ...initialState,
            scream: {
                screamId: '0',
                body: 'Hello everyone, how are you doing today?',
                createdAt: '12/06/20',
                likeCount: 2,
                commentCount: 2,
                userHandle: 'user01',
                userImage: 'default',
                loadingLike: false,
                comments: [{
                    body: 'Good, very good actually. And you?',
                    screamId: '0',
                    }, {
                    body: 'Great, even better now to hear that',
                    screamId: '0',
                }]
            },

            screamIds: ['0'],
            screams: {
                '0': {
                    screamId: '0',
                    body: 'Hello everyone, how are you doing today?',
                    createdAt: '12/06/20',
                    likeCount: 2,
                    commentCount: 2,
                    userHandle: 'user01',
                    userImage: 'default',
                    loadingLike: false,
                },
            },
        }

        expect(dataReducer({...firstState}, {
            type: dataTypes.SUBMIT_COMMENT,
            payload
            }
        )).toEqual({
            ...firstState,
            scream: {
                ...firstState.scream,
                commentCount: 3,
                comments: [{
                    body: "I'm doing great too, thanks",
                    screamId: '0',
                    }, {
                    body: 'Good, very good actually. And you?',
                    screamId: '0',
                    }, {
                    body: 'Great, even better now to hear that',
                    screamId: '0',
                }]
            }
        })
    });

    test('handle case SET_GUEST_USER_DATA', () => {

        const payload = {
            screams: [{
                screamId: '0',
                body: 'Hello everyone, how are you doing today?',
                
            }, {
                screamId: '1',
                body: 'My first scream!!',
                
            },{
                screamId: '2',
                body: 'How do I post a scream?',
            }],

            user: {
                createdAt:"2019-10-08T20:09:44.728Z",
                handle:"chiquillokun",
                email:"chiquillo@kun.com",
               
            }
        } 
        
        const firstState = {
            ...initialState,
            screamIds: ['0'],
            screams: {
                '0': {
                    screamId: '0',
                    body: 'Hello everyone, how are you doing today?',
                    createdAt: '12/06/20',
                    likeCount: 2,
                    commentCount: 2,
                    userHandle: 'user01',
                    userImage: 'default',
                    loadingLike: false,
                },
            },
        }

        expect(dataReducer({...firstState}, {
            type: dataTypes.SET_GUEST_USER_DATA,
            payload
            }
        )).toEqual({
            ...firstState,
            screamIds: ['0', '1', '2'],
            screams: {
                '0': {
                    ...payload.screams[0]
                },
                '1': {
                    ...payload.screams[1]
                },
                '2': {
                    ...payload.screams[2]
                },
            },
            loading: false,
            guestUser: {
                ...payload.user
            }
        })
    });
})