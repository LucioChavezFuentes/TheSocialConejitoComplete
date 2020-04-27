
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Home from '../home';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { mocked } from 'ts-jest/utils';
import axios from 'axios';
//MUI Imports
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

jest.mock('axios');

//React Testing Library
import { render, cleanup, waitFor} from '@testing-library/react';

//the library to create snapshos of components
import renderer from 'react-test-renderer';

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

  //const mockGet = mocked(axios.get, true)
  const mockAxios = mocked(axios, true);
    
  beforeEach(() => {
    mockAxios.mockClear()
  });

  afterEach(cleanup);
    

    test("Home component display screams correctly", async () => {

        const payload = {
            data : [{
                    screamId: '2', body: 'Buenas monos', userHandle:'user22', userImage: "https://firebasestorage.googleapis.com/v0/b/thesocialmono.appspot.com/o/6789615555.jpg?alt=media"
                }, {
                    screamId: '3', body: 'Hola a todos', userHandle:'user22', userImage: "https://firebasestorage.googleapis.com/v0/b/thesocialmono.appspot.com/o/6789615555.jpg?alt=media"
                }]
            }
        
        //const normalizedScreams : dataTypes.ScreamSchema = normalize(payload.data, schema.arrayOfScreams)
        
        mockAxios.get.mockResolvedValue(payload);
        /*dataActions.getScreams.mockImplementation(() =>  {

            return {type:'SET_SCREAMS', payload: normalizedScreams }
        
        })*/
        const {getByText} = render(<HomeComponent />);
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(getByText('Buenas monos')).toBeTruthy());
        
    });

    /*test("Home's skeleton composition", () => {
        const componentHome =  renderer.create(<HomeComponent />).toJSON();
          expect(componentHome).toMatchSnapshot();

    });*/

})