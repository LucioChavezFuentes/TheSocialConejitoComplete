import { createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {};

const middleware = [thunk]

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    ui: uiReducer
})


const store = createStore(
    reducers, 
    initialState, 
    composeWithDevTools(
        applyMiddleware(...middleware), 
    )
);

//makeNewStore only for testing purposes
export const makeNewStore = () => createStore(
    reducers, 
    initialState, 
    applyMiddleware(...middleware),
    )

export default store;


export type AppState = ReturnType<typeof reducers>;