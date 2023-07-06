import React, { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom';
// MUI Stuff
import { Menu, MenuItem, IconButton, Typography, Tooltip, Badge } from '@material-ui/core';
// Icons
import NotificationIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions'




const Notifications = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const dispatch = useDispatch();

    const notification = useSelector(state => state.user);
    const { userInfo } = notification;

    dayjs.extend(relativeTime);

    const handleOpen = (e) => setAnchorEl(e.target);
    const handleClose = () => setAnchorEl(null);

    const onMenuOpened = () => {
        let unreadNotificationIds = userInfo?.notifications
        .filter(status => !status.read)
        .map(notRead => notRead.notificationId);
        dispatch(markNotificationsRead(unreadNotificationIds));
    }


    let notificationIcon;

    if(userInfo?.notifications && userInfo?.notifications.length > 0 ){
        let unread =  userInfo?.notifications.filter(status => status.read === false ).length;
        unread > 0 ?  notificationIcon = (
            <Badge badgeContent={unread} color='secondary'>
                <NotificationIcon />
            </Badge>
        ):( notificationIcon = <NotificationIcon /> )
    }else notificationIcon = <NotificationIcon />

    let notificationsMarkup = userInfo?.notifications && userInfo?.notifications.length > 0 ? 
        ( userInfo?.notifications.map(status => {
            const verb = status.type === 'like' ? 'Liked' : 'Commented on';
            const time = dayjs(status.createdAt).fromNow();
            const iconColor = status.read ?  'primary': 'secondary';
            const icon = status.type === 'like' ? ( <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />) : (( <ChatIcon color={iconColor} style={{marginRight: 10}} />))
            return(
                <MenuItem key={status.createdAt} onClick={handleClose}>
                    {icon}
                    <Typography 
                        component={Link}
                        color='inherit'
                        variant='body1'
                        to={`/user/${status.recipient}/holla/${status.hollaId}`}>
                            {status.sender} {verb} your holla {time}
                    </Typography>
                </MenuItem>
            )
        })):(<MenuItem onClick={handleClose}> You have no notification yet</MenuItem> )

    return (
        <>
            <Tooltip placement='top' title='Notfications'>
                <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined }
                    aria-haspopup='true'
                    onClick={handleOpen}>
                        { notificationIcon }
                </IconButton>
            </Tooltip>
            <Menu 
                anchorEl={anchorEl} 
                open={Boolean(anchorEl)}
                onClose={handleClose}
                keepMounted
                onEntered={onMenuOpened}>
                {/* onEntered={onMenuOpened}> */}
                    {notificationsMarkup}
            </Menu>
        </>
    )
}

export default Notifications;