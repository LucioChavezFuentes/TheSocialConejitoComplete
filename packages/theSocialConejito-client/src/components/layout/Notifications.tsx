import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom';
import dayjs from 'dayjs'; 
import relativeTime from 'dayjs/plugin/relativeTime'; 
import NotificationsDialog from './NotificationsDialog';

//MUI Imports
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

//Icons Imports
import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

//Redux Imports
import {connect} from 'react-redux';
import {markNotificationsRead} from '../../redux/actions/userActions'; 
import { AppState } from '../../redux/types';
 

interface State {
    anchorElement: any ;
}

interface Props {
    notifications: any[]
    markNotificationsRead: (notificationsIds: string[]) => void;
}

class Notifications extends Component<Props, State> {
    state: State = {
        anchorElement : null
    }

    handleOpen = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        this.setState({anchorElement: event.target})
    };

    handleClose = () => {
        this.setState({anchorElement: null})
    }

    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications
            .filter(notif => !notif.read)
            .map(notif => notif.notificationId);
        
            this.props.markNotificationsRead(unreadNotificationsIds);
    }

    render() {
        const notifications = this.props.notifications;
        const anchorElement = this.state.anchorElement;

        dayjs.extend(relativeTime);

        let notificationsIcon;

        if(notifications && notifications.length > 0){

            const unreadNotifications = notifications.filter(notif => notif.read === false)

            notificationsIcon = unreadNotifications.length > 0 ? (
                
                <Badge badgeContent={unreadNotifications.length}
                    color='secondary'>
                    <NotificationsIcon />
                </Badge>
            ) : (
                 <NotificationsIcon />
            )
        } else {
             notificationsIcon = <NotificationsIcon />
        }; 

        const notificationsMarkUp =
            (notifications && notifications.length > 0) ? (
                notifications.map(notif => {
                    const verb = notif.type === 'like' ?  'like' : 'comment on'
                    const time =  dayjs(notif.createdAt).fromNow();
                    const iconColor = notif.read ? 'primary' : 'secondary';
                    
                    const icon = notif.type === 'like' ? (
                        <FavoriteIcon color={iconColor} style={{marginRight: '1rem'}} />
                    ) : (
                        <ChatIcon color={iconColor} style={{marginRight: '1rem'}} />
                    )

                    return (
                        <MenuItem key={notif.createdAt} onClick={this.handleClose}>
                            {icon}
                            {/* 
                             // @ts-ignore */}
                            <Typography component={Link}
                                color='textPrimary' 
                                variant='body1'
                                to={`/users/${notif.recipient}/scream/${notif.screamId}`}
                            >
                                    {notif.sender} {verb} your squeal {time}
                            </Typography>
                        </MenuItem>
                    )

                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    No notifications for now bunny.
                </MenuItem>
            )

        return ( window.innerWidth >= 600 ?
            <Fragment>
                <Tooltip title='Notificaciones' placement='top'>
                    <IconButton aria-owns={anchorElement ? 'simple-menu' : undefined} aria-haspopup='true' onClick={this.handleOpen}>
                        {notificationsIcon}
                    </IconButton>
                </Tooltip>
                <Menu
                    style={{top: '35px'}}
                    anchorEl={anchorElement}
                    open={Boolean(anchorElement)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                    
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }} 
                    >
                        {notificationsMarkUp}

                </Menu>
            </Fragment> 
            : (
                <NotificationsDialog notificationsIcon={notificationsIcon} />
            )
        )
    }
}

const mapStateToProps = (appState: AppState) => ({
    notifications: appState.user.notifications
})

export default connect(mapStateToProps, {markNotificationsRead})(Notifications)
