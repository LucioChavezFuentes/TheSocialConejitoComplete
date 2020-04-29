jest.mock('axios');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
//import {} from './redux/actions/userActions';

//React Testing Library
import { render, cleanup, waitFor, fireEvent} from '@testing-library/react';
// mock Types
import { mocked } from 'ts-jest/utils';
import { SET_USER } from './redux/types/actionTypes/userTypes';

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

  /*axios.post = jest.fn().mockResolvedValue(dummyToken);
  axios.get = jest.fn().mockResolvedValue(dummyUserProfileData);*/

  const mockAxios = mocked(axios, true);
  //const mockPostAxios = mocked(axios.post, true);

  beforeEach(() => {
    /*mockGetAxios.mockClear();
    mockPostAxios.mockClear();*/
    mockAxios.mockClear();
    //Don't forget to clear the sub-methods such as 'get' or 'post'
    mockAxios.get.mockClear();
  });

  afterEach(cleanup);

  


  it('renders without crashing', () => {

    mockAxios.get.mockResolvedValue(dummyUserProfileData);
    mockAxios.CancelToken.source.mockImplementation(() => {
      return {
        token: {},
        cancel: () => {}
      }
    })

    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("on login success, change to home's route and page", async () => {

    

    mockAxios.post.mockResolvedValue(dummyToken);
    mockAxios.get.mockResolvedValue(dummyUserProfileData);
    mockAxios.CancelToken.source.mockImplementation(() => {
      return {
        token: {},
        cancel: () => {}
      }
    })

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

  })

})






    