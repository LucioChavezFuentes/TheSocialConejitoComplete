import React from 'react';
import noImg from '../images/noImage.png';
import {withStyles, WithStyles,  createStyles, Theme } from '@material-ui/core';

//MUI Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

//MUI Imports
import Paper from '@material-ui/core/Paper';

const styles = ({palette}: Theme) => createStyles({
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
      },

      handle: {
          hegiht: '1.5rem',
          backgroundColor: palette.primary.main,
          width: '4rem',
          margin: '0 auto 0.5rem auto'
      },

      fullLine: {
          height: '1rem',
          backgroundColor: 'rgba(0,0,0, 0.6)',
          width: '90%',
          marginBottom: '0.7rem'
      },

      halfLine: {
          height: '1rem',
          backgroundColor: 'rgba(0,0,0, 0.6)',
          width: '50%',
          marginBottom: '0.7rem'
      }
})

interface Props extends WithStyles<typeof styles> {
    
}

const ProfileSkeleton: React.FC<Props> = (props : Props) => {
    const {classes} = props;
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={noImg} alt="profile" className='profile-image' />
                </div>
                <hr />
                <div className='profile-details' >

                    <div className={classes.handle} />
                    <hr />
                    <div className={classes.fullLine} />
                    <div className={classes.fullLine} />
                    <hr />
                    <LocationOn color='primary'/> 
                    <hr />
                    <LinkIcon color='primary'/> 
                    <hr />
                    <CalendarToday color='primary'/>
                    
                </div>
            </div>
        </Paper>
    )
}


export default withStyles(styles)(ProfileSkeleton);
