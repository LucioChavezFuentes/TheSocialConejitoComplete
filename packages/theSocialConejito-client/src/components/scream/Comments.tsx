import React, { Component, Fragment } from 'react';
import {withStyles, WithStyles,  createStyles } from '@material-ui/core';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs'; 

//MUI Imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = createStyles({

    invisibleSeparator: {
        width: '90%',
        border: 'none',
        margin: '0.3rem' 
    },

    visibleSeparator: {
        width: '90%',
        borderBottom: '0.1rem solid rgba(0,0,0,0.1)',
        marginBottom: '1.5rem'
    },

    commentImage: {
        maxWidth: '100%',
        height: '5rem',
        objectFit: 'cover',
        borderRadius: '50%'
    },

    commentData: {
        marginLeft: '1.2rem',
    }
})

interface comment {
    body: string;
    createdAt: string;
    userImage: string;
    userHandle: string;
    screamId: string;
}

interface Props extends WithStyles<typeof styles> {
    comments: comment[]
}

class Comments extends Component<Props> {
    render() {

        const {classes, comments} = this.props;

        return (
            <Grid container>
                
                {comments.map((comment : comment, index) => {
                    const {body, createdAt, userImage, userHandle} = comment;

                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <img src={userImage} alt="Comment" className={classes.commentImage} />
                                    </Grid>
 
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            {/* 
                                              //@ts-ignore   */}
                                        <Typography variant='h5' component={Link} to={`/user/${userHandle}`} color='primary'>
                                                
                                                {userHandle}

                                        </Typography>
                                        <Typography
                                            variant='body2'
                                            color='textSecondary'>

                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}

                                        </Typography>

                                        <hr className={classes.invisibleSeparator} />

                                        <Typography variant='body1'>
                                            {body}
                                        </Typography>
                                        </div>
                                        
                                    </Grid>
                                </Grid>
                            </Grid>

                            {index !== comments.length - 1 ? (
                                <hr className={classes.visibleSeparator}/>
                            ) : ( 
                               <hr className={classes.invisibleSeparator} /> 
                            )}

                        </Fragment> 
                    )
                })}

            </Grid>
        )
    }
}

export default withStyles(styles)(Comments)
