import { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import UserActions from './actionTypes/userTypes';
import UiActions from './actionTypes/uiTypes';
import DataActions from './actionTypes/dataTypes';
import {AppState} from '../store';


export interface  UserData  {
    email: string;
    password: string;
}

export interface  NewUserData  {
    email: string;
    password: string;
    confirmPassword: string;
    handle: string;
}

export type Action = UserActions | UiActions | DataActions;

export type Store = ReduxStore<AppState, Action>;

export type Dispatch = ReduxDispatch<Action>;

export type AppState = AppState