import React, { Component } from 'react'
import {withStyles, WithStyles,  createStyles } from '@material-ui/core';
import AppIcon from '../images/icon.svg';
import {Link} from 'react-router-dom';
import {History} from 'history'; 

//MUI Imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';



//Redux Imports
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions';
import { AppState, UserData } from '../redux/types';

//The Dynamic Key Type Index for setState aparently works if State properties are set as optional
//More info in: https://stackoverflow.com/questions/42090191/picks-k-type-with-dynamic-computed-keys
interface LoginState {
    email : string ;
    password: string;
    errors: any;
    

    
}

interface LoginProps extends WithStyles<typeof styles> {
    history: History
    loginUser: (userData : UserData, history : History) => any;
    user: AppState['user'];
    ui: AppState['ui'];
 }

const styles = createStyles({
    form :{
        textAlign: "center"
    },
    image: {
        margin: "1.5rem auto",
        width: '10rem',
        height: '10rem'
    },
    pageTitle: {
        margin: "0.2rem auto"

    },
    textField : {
        margin: "0.8rem auto"
    },
    button: {
        margin: "0.8rem auto",
        position: 'relative'
    },
    customError: {
        margin: "0.8rem auto",
        color: 'red',
        fontSize: '0.8rem'
    },
    progress : {
        position: 'absolute'
    }
}); 

class Login extends Component<LoginProps, LoginState> {

    state:LoginState = {
        email: '',
        password: '',
        errors: {},
    }

    /*UNSAFE_componentWillReceiveProps(nextProps : LoginProps) {
        if(nextProps.ui.errors){
            this.setState({ errors: nextProps.ui.errors})
        }
        
    }*/

    handleSubmit = (event : React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData, this.props.history);

    }
    handleChange = (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const key = event.currentTarget.name as keyof LoginState;
        const value =  event.currentTarget.value; 
        //@ts-ignore
        //The error is the following: https://stackoverflow.com/questions/42090191/picks-k-type-with-dynamic-computed-keys
        this.setState({ 
            [key]: value
        })    
    }  

    render() {
        const {classes, ui: {loading, errors}} = this.props;
        //const {errors} = this.state;
        return (
            <Grid container className= {classes.form}>

                <Grid item sm />

                <Grid item sm>
                   <img  src={AppIcon} alt='El Conejito te saluda' className={classes.image} />
                   <Typography variant='h2' className={classes.pageTitle}>
                        Login
                   </Typography>
                   <form  noValidate onSubmit={this.handleSubmit}> 

                    <TextField id='email' name='email' type='email' label='Email' helperText={errors.email} error={errors.email ? true : false} 
                        className={classes.textField} value={this.state.email} onChange={this.handleChange} fullWidth/> 
                    
                    <TextField id='password' name='password' type='password' label='Password' helperText={errors.password} error={errors.password ? true : false}
                        className={classes.textField} value={this.state.password} onChange={this.handleChange} fullWidth/> 

                    {errors.general &&
                        <Typography variant='body2' className={classes.customError} >
                            {errors.general}
                        </Typography> }
                    
                    <Button type='submit' variant='contained' color='primary' className={classes.button} disabled={loading}>
                        Login
                        {loading && (
                            <CircularProgress size={30} className={classes.progress} />)}
                    </Button>

                   </form>
                   
                   <small>
                       Don't have an account? Sign up <Link to='/signup'>here</Link> 
                   </small>
                </Grid>
 
                <Grid item sm />

                
            </Grid>
        )
    }
}

const mapStateToProps = (globalState: AppState) => ({
    user: globalState.user,
    ui: globalState.ui
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login))