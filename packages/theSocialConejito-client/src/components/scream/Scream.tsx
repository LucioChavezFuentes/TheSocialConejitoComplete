import React, { Component } from 'react'
import {withStyles, WithStyles,  createStyles, Theme} from '@material-ui/core';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs'; 
import relativeTime from 'dayjs/plugin/relativeTime'; 
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import  LikeButton  from './LikeButton';

//Material UI Cards
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

//Redux Imports
import {connect} from 'react-redux';
import {likeScream, unlikeScream} from '../../redux/actions/dataActions';
import { AppState } from '../../redux/store';

//Icons
import ChatIcon from '@material-ui/icons/Chat';

const styles = (theme: Theme) => createStyles({
    card : {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: '12rem',
        [theme.breakpoints.down('sm')]: {
            minWidth: '2rem',
            maxHeight: '2rem',
            margin: '15px',
            marginRight: '0',
            borderRadius: '50%',
            
        },
        
    },
    content: {
        padding: '25px',
        objectFit: "cover",
        width:'100%',

        [theme.breakpoints.down('sm')]: {
            padding: '15px',
        },

        [theme.breakpoints.down(290)]: {
            padding: '10px',
        },

        '& button': {
            [theme.breakpoints.down(290)]: {
                padding: '5px',
            },
        }
    }
})

interface ScreamProps extends WithStyles<typeof styles>  {
    scream: any;
    likeScream: (screamId: string) => void;
    unlikeScream: (screamId: string) => void;
    user: AppState['user'];
    openDialog?: boolean;
    
}

class Scream extends Component<ScreamProps> {
    

    render() {
        const {classes, scream : {
            userImage, body, createdAt, userHandle, screamId, likeCount, commentCount, loadingLike}, 
            user: {authenticated, credentials: { handle }
            }
        } = this.props
        
        
        const isMobile = window.innerWidth <= 600;

        dayjs.extend(relativeTime);

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId} />
            ) : null

        return (
            
            <div > 
                <Card className={classes.card}>
                    <CardMedia image={userImage} title={'Profile Image'} className={classes.image} /> 
                    {deleteButton}
                    
                    <CardContent className={classes.content}>
                        {/* 
                             // @ts-ignore */}
                        <Typography variant='h5' color='primary' component={Link} to={`/users/${userHandle}`}>
                                {userHandle} 
                        </Typography>

                        <Typography variant='body2' color='textSecondary'> {dayjs(createdAt).fromNow()} </Typography>

                        <Typography variant='body1' > {body} </Typography> 
                        
                        <LikeButton screamId={screamId} loadingLike={loadingLike} />

                        <span>{`${likeCount} ${isMobile ? "" : "Likes"}` }</span>

                        {!authenticated ? (
                            <Link to='/login'>
                                <MyButton tipTitle='Like'>
                                    <ChatIcon color='primary' />
                                </MyButton>
                            </Link> ) : (
                                <MyButton  tipTitle='Comment' >
                                    <ChatIcon color='primary' />
                                </MyButton>
                            )}

                        

                        <span>{`${commentCount} ${isMobile ? "" : "Comments"}`} </span>

                        <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog} />

                    </CardContent>
                </Card>  
            </div>
        ) 
    }
}

const mapStateToProps = (appState: AppState) => ({
    user: appState.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
}
 
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));
