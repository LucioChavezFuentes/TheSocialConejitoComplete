import React, { Component, Fragment } from 'react';
import {withStyles, WithStyles,  createStyles, Theme } from '@material-ui/core';
import MyButton from '../../util/MyButton';

//Material Ui Imports
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

//Material Ui Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

//Redux Imports
import {connect} from 'react-redux';
import {deleteScream} from '../../redux/actions/dataActions';
import {closeDeleteScreamAlert} from '../../redux/actions/uiActions';
import { AppState } from '../../redux/types';
import {SUCCESS} from '../../redux/types/actionTypes/dataTypes'

const microMobile = 270;

const styles = (theme: Theme) => createStyles({
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%',

        [theme.breakpoints.down('sm')]: {
            top: '10px',
            position: 'absolute',
            right: '16px',
            left: 'auto',
        },

        [theme.breakpoints.down(microMobile)]: {
            right: '5px',
        },
    },
    progressContainer: {
        top: '9%',
        left: '88%',
        position: 'absolute',
    },
    progress : {
        position: 'absolute'
      },

      
});

//TODO: Need Testing for Delete Scream Action
//TODO: Fix alert
interface Props extends WithStyles<typeof styles>{
    screamId: string;
    deleteScream: (screamId: string) => void;
    isDeletingScream: boolean;
    deleteScreamState: AppState['data']['deleteScream'];
    isDeleteScreamAlertOpen: boolean;
    closeDeleteScreamAlert: () => void;
}

interface State {
    open: boolean,
    openAlert: boolean,
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

class DeleteScream extends Component<Props, State> {

    state: State = {
        open: false,
        openAlert: false
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    shouldOpenAlert = (status: string) => {

    }

    handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.props.closeDeleteScreamAlert()
      };

    deleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.setState({
            open: false
        })
    }

    getSeverity = (status: string) => {
        return status === SUCCESS ? 'success' : 'error'
    }
    render() {
        const {classes, isDeletingScream, deleteScreamState, isDeleteScreamAlertOpen} = this.props;
        return (
            <Fragment>
                <MyButton tipTitle='Delete Scream' onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color='secondary' />
                </MyButton>
                <Dialog 
                    open={this.state.open || isDeletingScream}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                        <div style={{opacity: isDeletingScream ? 0.5 : 1}}>
                            <DialogTitle>
                                ¿Segurito que quieres borrar este Scream?
                            </DialogTitle>
                            <DialogActions>
                                <Button onClick={this.handleClose} color='primary'>
                                    Cancel
                                </Button>
                                <Button onClick={this.deleteScream} color='secondary'>
                                    Delete
                                </Button>
                            </DialogActions>
                        </div>
                        <div className={classes.progressContainer}>
                            {isDeletingScream && (<CircularProgress size={50} className={classes.progress} />)}
                        </div>

                </Dialog>
                <Snackbar open={isDeleteScreamAlertOpen} autoHideDuration={5000} onClose={this.handleCloseAlert}>
                    <Alert onClose={this.handleCloseAlert} severity={this.getSeverity(deleteScreamState.status)}>
                        {deleteScreamState.message}
                    </Alert>
                </Snackbar>
            </Fragment>
        )
    }
}

const mapStateToProps = (appState: AppState) => ({
    isDeletingScream : appState.data.isDeletingScream,
    deleteScreamState: appState.data.deleteScream,
    isDeleteScreamAlertOpen: appState.ui.isDeleteScreamAlertOpen,
})


export default connect(mapStateToProps, {deleteScream, closeDeleteScreamAlert})(withStyles(styles)(DeleteScream));

