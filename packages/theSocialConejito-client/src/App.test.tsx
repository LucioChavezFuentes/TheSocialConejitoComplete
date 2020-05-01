jest.unmock('axios');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route,} from 'react-router-dom';
import Home from './pages/home';
import User from './pages/user';
import NavBar from './components/layout/NavBar/NavBar';
import { Provider } from 'react-redux';
import * as dataActions from './redux/actions/dataActions'


//React Testing Library
import { render, cleanup, waitFor, fireEvent} from '@testing-library/react';
// mock Types
import { mocked } from 'ts-jest/utils';
import { SET_USER, SET_UNAUTHENTICATED } from './redux/types/actionTypes/userTypes';
import store, {makeNewStore} from './redux/store';

describe('App', () => {

  const dummyUserProfileData = {
    data: {
      credentials : {
        bio: 'Un Minino negrito sin causas ni ideales, solo quiero dormir',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/thesocialmono.appspot.com/o/6789615555.jpg?alt=media',
        createdAt: '2019-10-08T20:09:44.728Z',
        location: 'En tu corazón',
        website: 'https://www.youtube.com/watch?v=Mus_vwhTCq0',
        email: 'chiquillo@kun.com',
        handle: 'chiquillokun',
        userId: 'uizRsPgyA9YR5bHsHOELh1tw1Bz2',
      }
    }
  }

  const dummyToken = {
    data: {
      myDummyToken: 'Buenas'
    }
  }

  axios.post = jest.fn();
  axios.get = jest.fn();
  const spyCancelGetUserInfo = jest.spyOn(dataActions, 'cancelGetUserInfo');
  const spyCancelGetScreams = jest.spyOn(dataActions, 'cancelGetScreams')
  //const mockAxios = mocked(axios, true);

  //mocked is a useful library for TypeScript to get mock Types of a mocked dependency in Jest
  const mockPostAxios = mocked(axios.post, true);
  const mockGetAxios = mocked(axios.get, true);
  beforeEach(() => {
    mockGetAxios.mockClear();
    mockPostAxios.mockClear();
    //mockCancelGetUserInfo.mockClear();
    //mockAxios.mockClear();
    //Don't forget to clear the sub-methods such as 'get' or 'post'
    //mockAxios.get.mockClear();
    //store.dispatch({type: SET_UNAUTHENTICATED})
    spyCancelGetScreams.mockClear();
  });

  afterEach(() =>{
    spyCancelGetScreams.mockClear();
    cleanup();
  } );

  
  //When APP renders, axios 'get' and 'CancelToken' method are executed. 
  //Get must be mocked to prevent server calls, cancel is used in the app, so mock cancel is not necessary (as far I see).

  it('renders without crashing', () => {

    mockGetAxios.mockResolvedValue(dummyUserProfileData);
    /*mockAxios.CancelToken.source.mockImplementation(() => {
      return {
        token: {},
        cancel: () => {}
      }
    })*/

    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("on login success, change to home's route and page", async () => {

    

    mockPostAxios.mockResolvedValue(dummyToken);
    mockGetAxios.mockResolvedValue(dummyUserProfileData);
    /*mockAxios.CancelToken.source.mockImplementation(() => {
      return {
        token: {},
        cancel: () => {}
      }
    })*/

    /*const mockLoginUser = jest.fn(loginUser).mockImplementation((userData, history) => (dispatch) => {
      dispatch({
        type: SET_USER, 
        payload: {
          ...dummyUserProfileData,
          email: userData.email
        } 
      });
      history.push('/');
    });*/

    const {getByText, getByLabelText, getAllByText,} = render(<App />)

    const loginPageButtons = getAllByText('Login');
    const leftClick = {button: 0};
    
    //const submitButton = getByText('¡A Programar!');

    fireEvent.click(loginPageButtons[0], leftClick);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const loginButton = getAllByText('Login')[2];

    fireEvent.change(emailInput, {target: {value: 'chiquillo@kun.com'}});
    fireEvent.change(passwordInput, {target: {value: '123456'}});
    fireEvent.click(loginButton, leftClick);
    //mockAxios.get.mockResolvedValue(dummyUserProfileData);
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    
    await waitFor(() => expect(getByText('En tu corazón')).toBeTruthy());
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(3));
  });

  const HomeUser = () => {
    return (
        <Provider store={makeNewStore()}>
          <Router>
          <NavBar />
            <div className="container">
              <Switch>
  
                <Route exact path='/' component={Home} />
  
                <Route exact path='/users/:handle' component={User} />
  
              </Switch>
  
            </div>
          </Router>
        </Provider>
    );
  }

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  

  test('if Home unmounted cancel loading getScreams', async () => {

    //TODO: spy on cancelGetScreams 

    mockGetAxios.mockResolvedValue(delay(500).then(() => {
      return {
        data : [{
                screamId: '2', body: 'Buenas monos', userHandle:'user22', userImage: "https://firebasestorage.googleapis.com/v0/b/thesocialmono.appspot.com/o/6789615555.jpg?alt=media"
            }, {
                screamId: '3', body: 'Hola a todos', userHandle:'user22', userImage: "https://firebasestorage.googleapis.com/v0/b/thesocialmono.appspot.com/o/6789615555.jpg?alt=media"
            }]
        }
    }));

    const {getByText, getAllByText, getByAltText} = render(<HomeUser />)
    const leftClick = {button: 0};
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(getByText('Buenas monos')).toBeTruthy());

    mockGetAxios.mockResolvedValueOnce(delay(500).then(() => {
        return {
          data : {
            screams : [{
              screamId: '2', body: 'Buenas monos', userHandle:'user22', userImage: "https://firebasestorage.googleapis.com/v0/b/thesocialmono.appspot.com/o/6789615555.jpg?alt=media"
            }, {
              screamId: '3', body: 'Hola a todos', userHandle:'user22', userImage: "https://firebasestorage.googleapis.com/v0/b/thesocialmono.appspot.com/o/6789615555.jpg?alt=media"
            }]
          }
        }
      }
    ));

    const userLink = getAllByText('user22')[0];
    fireEvent.click(userLink, leftClick);

    mockGetAxios.mockResolvedValue(delay(500).then(() => {
      return {
        data : [{
                screamId: '2', body: 'Buenas monos', userHandle:'user22', userImage: "https://firebasestorage.googleapis.com/v0/b/thesocialmono.appspot.com/o/6789615555.jpg?alt=media"
            }, {
                screamId: '3', body: 'Hola a todos', userHandle:'user22', userImage: "https://firebasestorage.googleapis.com/v0/b/thesocialmono.appspot.com/o/6789615555.jpg?alt=media"
            }]
        }
    }));

    expect(getByAltText('profile')).toBeTruthy()

    const homeLink = getAllByText('Home')[0];
    //const submitButton = getByText('¡A Programar!');
    fireEvent.click(homeLink, leftClick);
    expect(spyCancelGetUserInfo).toHaveBeenCalledTimes(1);
    spyCancelGetUserInfo.mockRestore();

    const loginLink = getAllByText('Login')[0];
    fireEvent.click(loginLink, leftClick);
    expect(spyCancelGetScreams).toHaveBeenCalledTimes(2);
    spyCancelGetScreams.mockRestore();
  })

})






    