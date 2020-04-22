
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/dataActions';
import * as types from '../../types/actionTypes/dataTypes';
import {initialState} from '../../reducers/dataReducer';
import axios from 'axios';
import {normalize} from 'normalizr';
import * as schema from '../../schema';

jest.mock('axios');

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    //@ts-ignore
    axios.mockClear()
  })

  it('creates SET_SCREAMS when fetching screams has been done', () => {
    
    const response = {
        data : [{
                screamId: '0', body: 'Buenas'
            }, {
                screamId: '1', body: 'Hola'
            }]
            }
     //@ts-ignore
    axios.get.mockResolvedValue(response);

    /*fetchMock.get('http://localhost:5000/thesocialmono/us-central1/api/screams', {
      data: { screams: [{screamId: '1', body: 'Buenas'}, {screamId: '2', body: 'Hola'}] },
      //headers: { 'content-type': 'application/json' }
    })*/

    const normalizedScreams : types.ScreamSchema = normalize(response.data, schema.arrayOfScreams)
    //console.log(normalizedScreams)
    const expectedActions = [
      { type: types.LOADING_DATA },
      { type: types.SET_SCREAMS, payload: normalizedScreams }
    ]
    const store = mockStore({ ...initialState })

    return store.dispatch(actions.getScreams() as any).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates SET_SCREAMS_FAILURE when fetching screams has been failed',  () => {
    
    const errorMessage = 'Network Error';
     //@ts-ignore
     axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)))

    /*fetchMock.get('http://localhost:5000/thesocialmono/us-central1/api/screams', {
      data: { screams: [{screamId: '1', body: 'Buenas'}, {screamId: '2', body: 'Hola'}] },
      //headers: { 'content-type': 'application/json' }
    })*/

    //console.log(normalizedScreams)
    const expectedActions = [
      { type: types.LOADING_DATA },
      { type: types.SET_SCREAMS_FAILURE, payload: Error(errorMessage)}
    ]
    const store = mockStore({ ...initialState })

 

    return store.dispatch(actions.getScreams() as any).then((error: any) => {
      // return of async actions
    expect(store.getActions()).toEqual(expectedActions)
    })
  })
})