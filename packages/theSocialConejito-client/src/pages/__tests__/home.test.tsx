//jest.mock('../../redux/actions/dataActions')

import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Home from '../home';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import {normalize} from 'normalizr';
import { mocked } from 'ts-jest/utils';
import axios from 'axios';
//MUI Imports
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

jest.mock('axios');

import * as schema from '../../redux/schema';

//import dataActions
//import * as dataActions from '../../redux/actions/dataActions'
//import dataTypes
import * as dataTypes from '../../redux/types/actionTypes/dataTypes';
//React Testing Library
import { render, fireEvent, cleanup, waitFor, waitForDomChange, wait, screen } from '@testing-library/react';

//the library to create snapshos of components
import renderer from 'react-test-renderer';
import { Dispatch } from 'redux';

const theme = createMuiTheme({

    palette: {
      primary: {
        main: '#1e88e5',
      },
      secondary: {
        main: '#e64a19',
      },
    },
  })

  afterEach(() => {
    //@ts-ignore
    axios.mockClear()
  })

//const mockGetScreams = mocked(dataActions.getScreams, true)

afterEach(cleanup);

const HomeComponent = () => (
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <BrowserRouter>
                <Home/>
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>
)


describe('home page', () => {
    

    

    test("Home component display screams correctly", async () => {

        const payload = {
            data : [{
                    screamId: '2', body: 'Buenas monos', userHandle:'user22', userImage: "https://firebasestorage.googleapis.com/v0/b/thesocialmono.appspot.com/o/6789615555.jpg?alt=media"
                }, {
                    screamId: '3', body: 'Hola a todos', userHandle:'user22', userImage: "https://firebasestorage.googleapis.com/v0/b/thesocialmono.appspot.com/o/6789615555.jpg?alt=media"
                }]
            }
        
        //const normalizedScreams : dataTypes.ScreamSchema = normalize(payload.data, schema.arrayOfScreams)

        axios.get.mockResolvedValue(payload);
        /*dataActions.getScreams.mockImplementation(() =>  {

            return {type:'SET_SCREAMS', payload: normalizedScreams }
        
        })*/
         render(<HomeComponent />)
        //wfawexpect(screen.getByText('Buenas monos')).toBeTruthy()
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1))
        await waitFor(() => expect(screen.getByText('Buenas monos')).toBeTruthy())

        
    });

    /*test("Home's skeleton composition", () => {
        const componentHome =  renderer.create(<HomeComponent />).toJSON();
          expect(componentHome).toMatchSnapshot();

    });*/

})