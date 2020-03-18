import React, { Component, Fragment } from 'react';
import {withStyles, WithStyles,  createStyles } from '@material-ui/core';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';  
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

//MUI Imports
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//MUI Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

//Redux Imports
import {connect} from 'react-redux';
import {getScream} from '../../redux/actions/dataActions';
import {clearErrors} from '../../redux/actions/uiActions';
import { AppState } from '../../redux/types';

const styles = createStyles({
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '3%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    profileImage: {
        maxWidth: '10rem',
        height: '10rem',
        borderRadius: '50%',
        objectFit: 'cover'
    }, 
    invisibleSeparator: {
        border: 'none',
        margin: '0.3rem' 
    },
    dialogContent: {
        padding: '1.5rem'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: '3rem',
        marginBottom: '3rem' 
    },
    visibleSeparator: {
        width: '90%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: '1rem'
    },
    commentsContainer: {
        padding: '1.5rem',
        width: '90%'
    }
})

interface Props extends WithStyles<typeof styles>{
    scream: any;
    ui: AppState['ui'];
    screamId: string;
    userHandle: string;
    getScream: (screamId: string) => void;
    clearErrors: () => void;
    openDialog?: boolean;
}

interface State {
    open: boolean;
    oldPath: string;
    newPath: string;
}

class ScreamDialog extends Component<Props, State> {

    state: State = {
        open: false,
        oldPath: '',
        newPath: '' 
    }

    componentDidMount() {
        if(this.props.openDialog){
            this.handleOpen()
        }
    } 
    
    handleOpen = () => {
        let oldPath = window.location.pathname

        const {screamId, userHandle} = this.props;
        let newPath = `/users/${userHandle}/scream/${screamId}`;

        if(oldPath === newPath){
            oldPath = `/users/${userHandle}`
        }

        window.history.pushState(null, '', newPath)

        this.setState({open: true, oldPath, newPath});
        this.props.getScream(this.props.screamId);
    }

    handleClose = () => {
        window.history.pushState(null, '', this.state.oldPath);

        this.setState({open: false});
        this.props.clearErrors();
    }

    render() {
        const {classes, scream: {
            screamId, 
            createdAt, 
            body, 
            commentCount, 
            likeCount, 
            userImage, 
            userHandle,
            comments
        }, 
            ui : {
                loading
            } 
        } = this.props;

        const dialogMarkUp = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress color='primary' size={200} thickness={2} />
            </div> 
        ) : (
            <Grid container spacing={6}> 
                <Grid item sm={5}>
                    <img src={userImage} alt='Profile' className={classes.profileImage} />  
                </Grid>
                <Grid item sm={7}>
                        {/* 
                             // @ts-ignore */}
                    <Typography component={Link} to={`/users/${userHandle}`} variant='h5' color='primary' >
                             @{userHandle}
                    </Typography>

                    <hr className={classes.invisibleSeparator} />

                    <Typography variant='body2' color='textSecondary'>
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>

                    <hr className={classes.invisibleSeparator} />

                    <Typography variant='body1'>
                        {body}
                    </Typography>

                    <LikeButton screamId= {screamId} /> 

                    <span>{likeCount}  Likes</span>

                    <MyButton  tipTitle='Comment' >
                        <ChatIcon color='primary' />
                    </MyButton>

                    <span>{commentCount} Comments </span>
                </Grid>

                <hr className={classes.visibleSeparator} />

                <CommentForm screamId={screamId}  />

                <div className={classes.commentsContainer}>
                    <Comments comments={comments}  />
                </div> 

            </Grid>
        )

        return (
            <Fragment>
                <MyButton tipTitle='see more' onClick={this.handleOpen} tipClassName={classes.expandButton}>
                    <UnfoldMore color='primary' />
                </MyButton>

                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>

                    <MyButton tipTitle='Cancel' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>

                    <DialogContent className={classes.dialogContent}>
                       {dialogMarkUp} 
                    </DialogContent> 

                </Dialog>

            </Fragment>
        )
    }
}

const mapStateToProps = (appState: AppState) => ({
    scream: appState.data.scream,
    ui: appState.ui
})


export default connect(mapStateToProps, {getScream, clearErrors})(withStyles(styles)(ScreamDialog))
