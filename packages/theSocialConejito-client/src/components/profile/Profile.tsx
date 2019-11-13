import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails'; 
import MyButton from '../../util/MyButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';

//MUI Imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { createStyles } from '@material-ui/core';
import { WithStyles } from '@material-ui/styles';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


// MUI Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

//Redux Import
import {connect} from 'react-redux';
import { AppState } from '../../redux/types';
import {logoutUser, uploadImage} from '../../redux/actions/userActions';


interface Props extends WithStyles<typeof styles> {
    user: AppState['user'];
    uploadImage: (formData: FormData) => void;
    logoutUser: () => void;
}


const styles = createStyles({

    paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
})

class Profile extends Component<Props> {
  //send to server and Dispatch Action to Redux
  handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files![0]
    
    const formData = new FormData();
    formData.append('image', image, image.name )

    this.props.uploadImage(formData);
  }

  // handleEditPicture makes a reference of IconButton to <input type= 'file' id='imageInput /> in order to upload an image when click IconButton
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput!.click();
  }

  //Logout User 
  handleLogout = () => {
    //remove Firebase Token from borwser and dispatch SET_UNAUTHENTICATED type action
    this.props.logoutUser();
  }

  render() {
    const {
      classes,
      user: {
        credentials: {
          handle,
          createdAt,
          bio,
          imageUrl,
          location,
          website
        },
        loading,
        authenticated
      }
    } = this.props;
    const profileMarkUp = loading ? (<ProfileSkeleton />) : ( 
        authenticated ? (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className='profile-image' />
                    <input 
                      type="file" 
                      id="imageInput" 
                      hidden= {true}
                      onChange={this.handleImageChange} 
                      />
                    <MyButton tipTitle='Edit Profile Picture' btnClassName='button' onClick={this.handleEditPicture}>
                      <EditIcon color='primary' />
                    </MyButton>
                    
                </div>
                <hr />
                <div className='profile-details' >
                    <MuiLink component={Link} to={`/users/${handle}`} color='primary' variant='h5' >
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2"> {bio}</Typography>}
                    <hr />
                    {location && (
                        <Fragment>
                            <LocationOn color='primary'/> 
                            <span>{location}</span>
                            <hr />
                        </Fragment>
                    )}

                    {website && (
                        <Fragment>
                            <LinkIcon color='primary'/> 
                            <a href={website} target='_blank' rel='noopener noreferrer'>
                                {' '}{website}
                            </a> 
                            <hr />
                        </Fragment>
                    )}
                    <CalendarToday color='primary'/>{' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')} </span>
                </div>

                  <MyButton tipTitle='Logout' onClick={this.handleLogout}>
                    <KeyboardReturn color='primary' />
                  </MyButton>
                  
                  <EditDetails />
            </div>
        </Paper> ) : (

            <Paper className={classes.paper} >
                <Typography variant='body2' align='center'>
                    No profile found, please login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant='contained' color='primary' component={Link} to='/login'>
                        Login
                    </Button>
                    <Button variant='contained' color='secondary' component={Link} to='/signup'>
                        Signup
                    </Button>
                </div>
            </Paper>
        ))
    
    return  profileMarkUp;
  }
}

const mapStateToProps = (appState: AppState) => ({ 
  user: appState.user
});

export default connect(mapStateToProps, {logoutUser, uploadImage})(withStyles(styles)(Profile));
 