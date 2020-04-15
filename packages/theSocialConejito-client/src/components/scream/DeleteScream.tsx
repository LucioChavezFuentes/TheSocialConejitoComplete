import React, { Component, Fragment } from 'react';
import {withStyles, WithStyles,  createStyles, Theme } from '@material-ui/core';
import MyButton from '../../util/MyButton';

//Material Ui Imports
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

//Material Ui Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

//Redux Imports
import {connect} from 'react-redux';
import {deleteScream} from '../../redux/actions/dataActions';
import { AppState } from '../../redux/types';

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
});

//TODO: Need Testing for Delete Scream Action

interface Props extends WithStyles<typeof styles>{
    screamId: string;
    deleteScream: (screamId: string) => void;
    isDeletingScream: boolean;
}

interface State {
    open: boolean
}

class DeleteScream extends Component<Props, State> {

    state: State = {
        open: false
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

    deleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.setState({
            open: false
        })
    }
    render() {
        const {classes, isDeletingScream} = this.props;
        return (
            <Fragment>
                <MyButton tipTitle='Delete Scream' onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color='secondary' />
                </MyButton>
                <Dialog 
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                    style={{opacity: isDeletingScream ? 0.5 : 0}}
                    >
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

                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (appState: AppState) => ({
    isDeletingScream : appState.data.isDeletingScream
})


export default connect(mapStateToProps, {deleteScream})(withStyles(styles)(DeleteScream));

