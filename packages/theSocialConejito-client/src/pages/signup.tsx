import React, { Component } from 'react'
import {withStyles, WithStyles,  createStyles } from '@material-ui/core';
import AppIcon from '../images/icon.svg';
import {History} from 'history';
import {Link} from 'react-router-dom'; 

//MUI Imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux Imports
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userActions';
import { AppState, NewUserData } from '../redux/types'; 


//Types
interface SignupProps extends WithStyles<typeof styles> {
   history: History;
   user: AppState['user'];
   ui: AppState['ui'];
   signupUser: (newUserData : NewUserData, history: History) =>  void;
}



//The Dynamic Key Type Index for setState aparently works if State properties are set as optional
//More info in: https://stackoverflow.com/questions/42090191/picks-k-type-with-dynamic-computed-keys
interface SignupState {
    email : string ;
    password: string;
    confirmPassword: string;
    handle: string;
}

const styles = createStyles({
    form:{
        textAlign: "center",
        marginBottom: '20px',
    },
    image: {
        margin: "1.5rem auto",
        width: '10rem',
        height: '10rem'
    },
    pageTitle: {
        margin: "0.2rem auto"
  
    },
    textField: {
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
})   

class Signup extends Component<SignupProps, SignupState> {

    state: SignupState = {
        email: '',
        password: '',
        confirmPassword: '',
        handle:'',
        
    }

    handleSubmit = (event : React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }

        this.props.signupUser(newUserData, this.props.history)

    }
    handleChange = (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const key = event.currentTarget.name as keyof SignupState;
        const value =  event.currentTarget.value; 
        //@ts-ignore
        //The error is the following: https://stackoverflow.com/questions/42090191/picks-k-type-with-dynamic-computed-keys
        this.setState({
            [key]: value
        })    
    }  

    render() {
        const {classes, ui:{loading, errors}} = this.props;
        return (
            <Grid container className= {classes.form}>

                <Grid item sm />

                <Grid item sm>
                   <img  src={AppIcon} alt='Mono Cocol Inicios' className={classes.image} />
                   <Typography variant='h2' className={classes.pageTitle}>
                        Sign up
                   </Typography>
                   <form  noValidate onSubmit={this.handleSubmit}> 

                    <TextField 
                        id='email' 
                        name='email' 
                        type='email' 
                        label='Email' 
                        helperText={errors.email} 
                        error={errors.email ? true : false} 
                        className={classes.textField} 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        fullWidth/> 
                    
                    <TextField 
                        id='password' 
                        name='password' 
                        type='password' 
                        label='Password' 
                        helperText={errors.password} 
                        error={errors.password ? true : false}
                        className={classes.textField} 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        fullWidth/>
                    
                    <TextField 
                        id='confirmPassword' 
                        name='confirmPassword' 
                        type='password' 
                        label='Confirm Password' 
                        helperText={errors.confirmPassword} 
                        error={errors.confirmPassword ? true : false}
                        className={classes.textField} 
                        value={this.state.confirmPassword} 
                        onChange={this.handleChange} 
                        fullWidth/> 

                    <TextField 
                        id='handle' 
                        name='handle' 
                        type='text' 
                        label='Handle' 
                        helperText={errors.handle} 
                        error={errors.handle ? true : false}
                        className={classes.textField} 
                        value={this.state.handle} 
                        onChange={this.handleChange} 
                        fullWidth/> 


                    {errors.general &&
                        <Typography variant='body2' className={classes.customError} >
                            {errors.general}
                        </Typography> }
                    
                    <Button type='submit' variant='contained' color='primary' className={classes.button} disabled={loading}>
                        Sign Up
                        {loading && (
                            <CircularProgress size={30} className={classes.progress} />)}
                    </Button>

                   </form>
                   <small>
                       Already have an account? Login <Link to='/login'>here</Link> 
                   </small>
                   
                </Grid>
 
                <Grid item sm />

                
            </Grid>
        )
    }
}

const mapStateToProps = (globalState: AppState, ) => ({
    user: globalState.user,
    ui: globalState.ui
})



export default connect(mapStateToProps, {signupUser})(withStyles(styles)(Signup));