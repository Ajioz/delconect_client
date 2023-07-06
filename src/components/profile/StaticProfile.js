import React from 'react'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    
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

 
});


const StaticProfile = ({ profile }) => {

    const classes = useStyles();
    const {  profile: { handle, createdAt, imageUrl, bio, website, location } } = profile;
    
    return (
        <>
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className='image-wrapper'>
                        <img src={imageUrl} alt="profile" className='profile-image' />
                    </div><hr/>
                    <div className='profile-details'>
                        <MuiLink component={Link} to={`/user/${handle}`} color='primary' variant='h5'>
                            @{handle}
                        </MuiLink> 
                        <hr />
                        {bio && 
                            <Typography variant='body2'>
                                {bio}
                            </Typography> 
                        }
                        <hr />
                        { location &&
                            <>
                                <LocationOn color='primary' />
                                <span>{location}</span> 
                            </>
                        }
                        <hr />
                        {website && (
                            <>
                                <LinkIcon color='primary' />
                                <a href={website} target='_blank' rel='noopener noreferrer'>{' '}{website}</a>
                            </>
                        )}
                        <hr />
                        <CalendarTodayIcon color='primary' />{' '}
                        <span>Joined {dayjs(createdAt).format('MMM DD, YYYY ')} </span>
                    </div>
                </div>
            </Paper>
        </>
    )
}

export default StaticProfile