import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';


//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { logoutUser, getUserData } from './redux/actions/userActions';
import { SET_AUTHENTICATED } from './redux/types/actionTypes/userTypes';


//MUI Imports
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

//Components
import NavBar from './components/layout/NavBar/NavBar';

//Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import User from './pages/user';

//Util
import AuthRoute from './util/AuthRoute';


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

axios.defaults.baseURL = 'https://us-central1-thesocialmono.cloudfunctions.net/api';


const token = localStorage.FBIdToken
if (token) {

  const decodedToken: any = jwtDecode(token);

  console.log(decodedToken);

  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser() as any)
    //The infinite loop in location.href = '/login' was provoke because the token wasn't remove from the localStorage before settting location.href
    //You must remove the token from browser before setting location if the token is expired.
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData() as any)
  }

}


const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>

        <Router>
          <NavBar />
          <div className="container">
            <Switch>

              <Route exact path='/' component={Home} />

              <AuthRoute
                exact
                path='/login'
                component={Login}
              />
              <AuthRoute
                exact
                path='/signup'
                component={Signup}
              />

              <Route exact path='/users/:handle' component={User} />

              <Route exact path='/users/:handle/scream/:screamId' component={User} />

            </Switch>

          </div>

        </Router>

      </Provider>

    </MuiThemeProvider>

  );
}

export default App;
