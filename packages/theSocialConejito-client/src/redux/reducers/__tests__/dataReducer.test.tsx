
import dataReducer from '../dataReducer';
import * as dataTypes from '../../types/actionTypes/dataTypes';
import {initialState} from '../dataReducer'

describe('dataReducer', () => {

    
    test('dataReducer return initial state', () => {
       expect(dataReducer).toBeDefined()
    })

    test('handke case LOADING_DATA', () => {
        expect(dataReducer(undefined, {
            type: dataTypes.LOADING_DATA
            }
        )).toEqual({
            ...initialState,
            loading: true
        })
    })

    test('handke case LOADING_DATA', () => {
        expect(dataReducer(undefined, {
            type: dataTypes.LOADING_DATA
            }
        )).toEqual({
            ...initialState,
            loading: true
        })
    })

})