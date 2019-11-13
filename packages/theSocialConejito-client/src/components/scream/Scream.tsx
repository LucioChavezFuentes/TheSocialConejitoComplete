import React, { Component } from 'react'
import {withStyles, WithStyles,  createStyles } from '@material-ui/core';
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



const styles = createStyles({
    card : {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: '12rem'
    },
    content: {
        padding: 25,
        objectFit: ("cover" as any) 
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
            userImage, body, createdAt, userHandle, screamId, likeCount, commentCount}, 
            user: {authenticated, credentials: { handle }
            }
        } = this.props
        
        

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
                        
                        <LikeButton screamId={screamId} />

                        <span>{likeCount}  Likes</span>

                        <MyButton  tipTitle='Comment' >
                             <ChatIcon color='primary' />
                        </MyButton>

                        <span>{commentCount} Comments </span>

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
