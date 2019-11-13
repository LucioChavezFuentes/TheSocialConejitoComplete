import React, { Component, Fragment } from 'react';
import MyButton from '../../util/MyButton';
import {withStyles, WithStyles,  createStyles } from '@material-ui/core'; 

//Redux Imports
import {connect} from 'react-redux';
import {postScream} from '../../redux/actions/dataActions';
import {clearErrors, openWindowPostScream, closeWindowPostScream} from '../../redux/actions/uiActions';
import { AppState } from '../../redux/types';


//MUI Imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

//MUI Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';



const styles= createStyles({
    progress : {
        position: 'absolute'
      },

    textField: {
        margin: "0.8rem auto"
    },

    submitButton : {
        position: 'relative',
        float: 'right',
        marginBottom: '1%' 
    }, 

   
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '3%'
    }
    
})

interface Props extends WithStyles<typeof styles> {
    postScream: (newScream: any) => void;
    clearErrors: () => void;
    openWindowPostScream: () => void;
    closeWindowPostScream: () => void;
    ui: AppState['ui'];
}

interface State {
    
    body: string;
}

export class PostScream extends Component<Props, State> {
    state: State = {
        
        body: '',
    }
    
    handleOpen = () => {
        
        this.setState({body: ''});
        this.props.openWindowPostScream();
    }

    handleClose = () => {
        
        this.setState({body: ''});
        this.props.closeWindowPostScream();
        this.props.clearErrors(); 
    } 

    handleSubmit = (event : React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()

        const newScream = {
            body: this.state.body  
        };
        //postScream on Sucess will set erros to {} and Dispatch CloseWindowPostScream, 
        //  on Fail will fill Errors Redux State object with the corresponding errors.
        this.props.postScream(newScream);


        // It seems that the setState with Function as an argument dont have the props up to date 
        // after a Action Function Dispatch and they are called in a same function as handleSubmit.

        //This is NOT a Solution, it is an example of NOT TO DO. 
        //Instead, find the correct logic in componentDidUpdate when a change in props happen o create the actions needed in Redux.

        /*this.setState((state, props) => {
            if(_.isEmpty(props.ui.errors) &&  !props.ui.loading){
                return {open: false, body: ''}
            } else {
                return null
            }
        })*/
    }
    handleChange = (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const key = event.currentTarget.name as keyof State;
        const value =  event.currentTarget.value; 
        //@ts-ignore
        //The error is the following: https://stackoverflow.com/questions/42090191/picks-k-type-with-dynamic-computed-keys
        this.setState({
            [key]: value
        })    
    };  

    //This IS the correct solution in case you are not using Redux
 /*
    componentDidUpdate(prevProps: Props, prevState: State){
        const{ui : { loading, errors}} = this.props
        if((errors !== prevProps.ui.errors) && (_.isEmpty(errors) && !loading)){
            this.setState( {open: false, body: ''})
        }
    }; 
*/

    render() {
        const {classes, ui: { loading, errors, isWindowPostScreamOpen }} = this.props; 
        
        return (
            <Fragment>
                <MyButton tipTitle={'Post a Squeal'} onClick={this.handleOpen} tipClassName={'TobeDeclared'} btnClassName={'TobeDeclared'}  >
                    <AddIcon color='primary' />
                </MyButton> 
                <Dialog open={isWindowPostScreamOpen} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tipTitle='Cancel' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton> 

                    <DialogTitle> Post a Squeal </DialogTitle>

                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name='body'
                                type='text'
                                label='Scream'
                                value={this.state.body}
                                multiline
                                rows='3'
                                placeholder='Hechate un gritito'
                                error= {errors.body ? true: false}
                                helperText={errors.body} 
                                className={classes.textField}
                                onChange={this.handleChange}
                                //fullWidth is important, make sure its available to  better style on textField in a Dialog
                                fullWidth
                                
                                /> 
                            
                            <Button type='submit' variant='contained' color='primary' className={classes.submitButton} disabled={loading}>
                                    
                                    Submit
                                    {loading && (<CircularProgress size={30} className={classes.progress} />)}

                            </Button>

                        </form>
                    </DialogContent>
                </Dialog>


            </Fragment>
            
        )
    }
}
const mapStateToProps = (appState: AppState) => ({
    ui: appState.ui
})

const mapActionsToProps = {
    postScream, 
    clearErrors,
    openWindowPostScream,
    closeWindowPostScream}

export default connect(mapStateToProps, mapActionsToProps )(withStyles(styles)(PostScream))
 