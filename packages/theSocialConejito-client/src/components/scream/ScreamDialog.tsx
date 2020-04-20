import React, { Component, Fragment } from 'react';
import {withStyles, WithStyles,  createStyles, Theme } from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import dayjs from 'dayjs';  
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import axios, {CancelTokenSource} from 'axios';

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
import {getScream, cancelSetScream} from '../../redux/actions/dataActions';
import {clearErrors} from '../../redux/actions/uiActions';
import { AppState } from '../../redux/types';

//const microMobile = 270;

const styles = (theme: Theme) => createStyles({
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '3%',

        [theme.breakpoints.down('sm')]: {
            top: '5px',
            position: 'absolute',
            right: '0',
            left: 'auto',
        },

        
            
    },
    expandButton: {
        position: 'absolute',
        left: '90%',

        [theme.breakpoints.down('sm')]: {
            position: 'relative',
            left: 'auto',
            float: 'right',
        },
    },
    profileImageContainer: {
        textAlign: 'center',
    },
    profileImage: {
        maxWidth: '10rem',
        height: '10rem',
        borderRadius: '50%',
        objectFit: 'cover',
        [theme.breakpoints.down('sm')]: {
            height: '9rem',
            maxWidth: '9rem',
            
        },
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
    getScream: (screamId: string, cancelSource: CancelTokenSource) => void;
    clearErrors: () => void;
    openDialog?: boolean;
    cancelSetScream: (cancelSource: CancelTokenSource) => void;
}

interface State {
    open: boolean;
    oldPath: string;
    newPath: string;
    hasClosed: boolean;
}

interface PathParamsType {
    user : string;
    screamId: string
}

type screamDialogProps = RouteComponentProps<PathParamsType> & Props

class ScreamDialog extends Component<screamDialogProps, State> {

    state: State = {
        open: false,
        oldPath: '',
        newPath: '',
        hasClosed: false, 
    }

    source : any = null

    componentDidMount() {
        
        if(this.props.openDialog || this.props.match.params.screamId === this.props.screamId){
            this.handleOpen()
        }

    }

//TODO: Find a way to use componentDidUpdate only on the scream selected in the URL
//Will re-render and open the corresponding scream dialog in the URL if it dictates it.
    componentDidUpdate(prevProps :screamDialogProps , prevState : State) {
        const {screamId, userHandle, match: {params}, location} = this.props;
        const {location: prevLocation} = prevProps;
        const userPath = `/users/${userHandle}`
        const screamPath = `/users/${userHandle}/scream/${screamId}`
        const currentPath = location.pathname
        const prevPath = prevLocation.pathname

        if(currentPath !== userPath && params.screamId === screamId && (prevPath !== screamPath || prevPath === userPath) ){
            this.handleOpen()
        }
    } 
    
    handleOpen = () => {
        const CancelToken = axios.CancelToken;
        // create the source
        this.source = CancelToken.source();
        let oldPath = window.location.pathname

        const {screamId, userHandle} = this.props;
        let newPath = `/users/${userHandle}/scream/${screamId}`;
        //TODO: Make the user dont use spaces and more special characters for username
        if(oldPath === newPath){
            oldPath = `/users/${userHandle}`
        }

        window.history.pushState(null, '', newPath)

        this.setState({open: true, oldPath, newPath, hasClosed: false});
        this.props.getScream(this.props.screamId, this.source);
    }

    handleClose = () => {
        const loading = this.props.ui.loading;
        if(loading){
            this.props.cancelSetScream(this.source)
        }
        this.props.history.push(this.state.oldPath)
        //window.history.pushState(null, '', this.state.oldPath);

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
            comments = [],
            loadingLike
        }, 
            ui : {
                loading
            } 
        } = this.props;

        const isMobile = window.innerWidth <= 600;

        const dialogMarkUp = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress color='primary' size={isMobile ? 100 :200} thickness={2} />
            </div> 
        ) : (
            <Grid container alignItems='center' spacing={6}> 
                <Grid item xs={12} sm={5} className={classes.profileImageContainer}  >
                    <img src={userImage} alt='Profile' className={classes.profileImage} />  
                </Grid>
                <Grid item xs={12} sm={7}>
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

                    <LikeButton screamId= {screamId} loadingLike={loadingLike} /> 

                    <span>{`${likeCount} ${isMobile ? "" : "Likes"}` }</span>

                    <MyButton  tipTitle='Comment' >
                        <ChatIcon color='primary' />
                    </MyButton>

                    <span>{`${commentCount} ${isMobile ? "" : "Comments"}`}</span>
                </Grid>

                <hr className={classes.visibleSeparator} />

                <CommentForm screamId={screamId}  />

                <div className={classes.commentsContainer}>
                    <Comments comments={comments || []}  />
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


export default connect(mapStateToProps, {getScream, clearErrors, cancelSetScream})(withStyles(styles)(withRouter(ScreamDialog)))
