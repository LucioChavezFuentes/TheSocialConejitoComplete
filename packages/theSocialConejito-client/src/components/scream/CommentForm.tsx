import React, { Component } from 'react';
import {withStyles, WithStyles,  createStyles } from '@material-ui/core';
import _ from 'lodash';

//Redux Imports 
import {connect} from 'react-redux';
import {submitComment} from '../../redux/actions/dataActions';
import {clearErrors} from '../../redux/actions/uiActions';
import { AppState } from '../../redux/store';

//MUI Imports
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = createStyles({
    textField: {
        margin: "0.5rem auto"
    },

    button: {
        margin: "0.8rem auto",
        position: 'relative'
    },

    visibleSeparator: {
        width: '90%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: '1rem'
    }
})

interface Props extends WithStyles<typeof styles> {
    screamId: string
    submitComment: (screamId: string, commentData: {body: string}) => void;
    ui: AppState['ui'];
    authenticated: boolean;
    errors: any;
    clearErrors: () => void;
}

interface State {
    body: string,
    submitted: boolean
}

class CommentForm extends Component<Props, State> {

    state: State = {
        body: '',
        submitted: false
    }

    handleSubmit = (event : React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        const screamBody = {
            body: this.state.body
        }

        this.props.submitComment(this.props.screamId, screamBody )
 
        this.setState({submitted: true})
    }
    

    handleChange = (event: React.SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {

        //The error is the following: https://stackoverflow.com/questions/42090191/picks-k-type-with-dynamic-computed-keys
        //@ts-ignore
        this.setState({[event.currentTarget.name]: event.currentTarget.value})
    }

   componentDidUpdate(prevProps: Props, prevState: State) {
        if(this.state.submitted && _.isEmpty(this.props.errors)){
                this.setState({body: '', submitted: false})    
         }
   };  
    

    render() {
        const {authenticated, errors, classes} = this.props;
        
        const commentMarkUp = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        name='body'
                        type='text'
                        label='Comment on squeal'
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField} 
                    />
                    <Button type='submit' variant='contained' color='primary' className={classes.button}>
                        Comment
                    </Button>

                    <hr className={classes.visibleSeparator} />
                </form>
            </Grid>

        ) : null


        return commentMarkUp
        
    }
}

const mapStateToProps = (appState: AppState) => ({
    ui: appState.ui,
    authenticated: appState.user.authenticated,
    errors: appState.ui.errors
})

export default connect(mapStateToProps, {submitComment, clearErrors})(withStyles(styles)(CommentForm));
