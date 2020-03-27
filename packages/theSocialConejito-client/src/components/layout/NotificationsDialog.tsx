import React, {useState} from 'react'
import dayjs from 'dayjs'; 
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux'
import { AppState } from '../../redux/types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DialogContentText from '@material-ui/core/DialogContentText';

//Icons Imports
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'
import CloseIcon from '@material-ui/icons/Close';

import Typography from '@material-ui/core/Typography';


const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function NotificationsDialog(props: any) {

    const {notificationsIcon} = props;
    const notifications = useSelector((state: AppState) => state.user.notifications)
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const handleOpen = () => {
        setOpen(true);
      }

    const handleClose = () => {
        setOpen(false);
    }

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
                        <ListItem button key={notif.createdAt} onClick={handleClose}>
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
                        </ListItem>
                    )

                })
            ) : (
                <ListItem onClick={handleClose}>
                    No notifications for now bunny.
                </ListItem>
            )

    return (
        <>
            <IconButton aria-haspopup='true' onClick={handleOpen}>
                {notificationsIcon}
            </IconButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md' fullScreen={isMobile} scroll='body' TransitionComponent={Transition}>
            
                <DialogTitle>
                    Notifications

                    <div style={{float: 'right'}} >
                    <IconButton onClick={handleClose} style={{padding: 'unset'}}>
                        <CloseIcon />
                    </IconButton> 
                </div>
                </DialogTitle>

                

                <DialogContentText style={{marginLeft: '24px'}}>¡Bunnies reacted to you!</DialogContentText>

                <List>
                    {notificationsMarkUp}
                </List>
        
            
            </Dialog>
            
        </>
    )
}

export default NotificationsDialog
