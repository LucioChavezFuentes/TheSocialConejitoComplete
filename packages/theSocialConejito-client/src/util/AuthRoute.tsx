import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { AppState } from '../redux/types';

interface Props {
    component: any;
    authenticated: boolean;
    path: string;
    exact: boolean;
}

const AuthRoute: React.FC<Props> = ({component: Component, authenticated,  ...rest} ) => (
        
        <Route 
        {...rest} 
        render={(props) => authenticated === true ? <Redirect to='/' /> : <Component {...props} /> } 
        />
    )

const mapStateToProps = (globalState : AppState) => ({
    authenticated: globalState.user.authenticated
});

export default connect(mapStateToProps)(AuthRoute);