import React, { Component, Fragment } from 'react';
import {withStyles, WithStyles,  createStyles } from '@material-ui/core';
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

const styles = createStyles({
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
});

//TODO: Need Testing for Delete Scream Action

interface Props extends WithStyles<typeof styles>{
    screamId: string;
    deleteScream: (screamId: string) => void;
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
        const {classes} = this.props;
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


export default connect(null, {deleteScream})(withStyles(styles)(DeleteScream));

