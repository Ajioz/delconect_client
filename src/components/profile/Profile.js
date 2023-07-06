// React and Redux
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, logoutUser } from '../../redux/actions/userActions';

// Custom and Others
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs'
import { makeStyles } from '@material-ui/core/styles';

// MUI Icon
import LocationOn from '@material-ui/icons/LocationOn';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

// MUI Other Components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';



const toastParam = {
  position: "top-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "light"
}

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

    buttons: {
        textAlign: 'center',
        '& a': {
        margin: '20px 10px'
        }
    },

    submitButton:{
        position: 'relative',
        float: 'right',
        marginTop: 10
    },

});

const Profile = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.user);
    const { loading, userInfo, authenticated , errors } = userProfile;

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name)
        dispatch(uploadImage(formData));
        toast.error(`${errors.error}, Please login!`, toastParam);
    }

    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click()
    }
    
    const handleLogout = () => {
        dispatch(logoutUser())
    }

    return (
        <>
            {
                !loading ? (authenticated ? (
                    <Paper className={classes.paper}>
                        <div className={classes.profile}>
                            <div className='image-wrapper'>
                                <img src={userInfo?.credentials?.imageUrl} alt="profile" className='profile-image' />
                                <input 
                                    type='file' 
                                    id='imageInput'
                                    hidden='hidden'
                                    onChange={handleImageChange} />
                                    <MyButton 
                                        tip='Edit Profile Picture' 
                                        onClick={handleEditPicture} 
                                        btnClassName='button'
                                        placement='top'>
                                            <EditIcon color='primary'/>
                                    </MyButton>
                            </div><hr/>
                            <div className='profile-details'>
                                <MuiLink component={Link} to={`/user/${userInfo?.credentials?.handle}`} color='primary' variant='h5'>
                                    @{userInfo?.credentials?.handle}
                                </MuiLink> 
                                <hr />
                                { userInfo?.credentials?.bio && 
                                    <Typography variant='body2'>
                                        {userInfo?.credentials?.bio}
                                    </Typography> 
                                }
                                <hr />
                                { userInfo?.credentials?.location &&
                                    <>
                                        <LocationOn color='primary' />
                                        <span>{userInfo?.credentials?.location}</span> 
                                    </>
                                }
                                <hr />
                                {
                                    userInfo?.credentials?.website && (
                                        <>
                                            <LinkIcon color='primary' />
                                            <a href={userInfo?.credentials?.website} target='_blank' rel='noopener noreferrer'>{' '}{userInfo?.credentials?.website}</a>
                                        </>
                                    )
                                }
                                <hr />
                                <CalendarTodayIcon color='primary' />{' '}
                                <span>Joined {dayjs(userInfo?.credentials?.createdAt).format('MMM DD, YYYY ')} </span>
                            </div>
                            <MyButton 
                                tip='logout' 
                                onClick={handleLogout} 
                                placement='top'>
                                    <KeyboardReturn color='primary' />
                            </MyButton>
                            <EditDetails />
                        </div>
                    </Paper>
                ) : (
                <Paper className={classes.paper}>
                    <Typography variant='body2' align='center'>
                        No Profile Found, Please Login
                    </Typography>
                    <div className={classes.buttons}>
                        <Button variant='contained' color='primary' component={Link} to='/login'>
                            Login
                        </Button>
                        <Button variant='contained' color='secondary' component={Link} to='/signup'>
                            Signup
                        </Button>
                    </div>
                </Paper>) 
                ) : ( <ProfileSkeleton />)
            }
            <ToastContainer />
        </>
    )
}

export default Profile