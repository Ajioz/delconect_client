import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import MyButton from '../../util/MyButton';
import ChatIcon from '@material-ui/icons/Chat'
import DeleteHolla from './DeleteHolla';
import HollaDialog from './HollaDialog';
import LikeButton from './LikeButton';


const useStyles = makeStyles({

    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
        marginRight: 20,
    },
    image:{
        minWidth:200,
    },
    content:{
        padding: 25,
        objectFit: 'cover'
    },
})

const Holla = ({holla}) => {

    const classes = useStyles();
    const userData = useSelector(state => state.user);
    const { userInfo, authenticated } = userData;
   
    const {  body, createdAt, userImage, userHandle, hollaId, likeCount, commentCount   } = holla;
    dayjs.extend(relativeTime);

    // console.log("Total comment in thread so far: ", props?.holla?.comments?.newComment?.countComment);
 
   
    const deleteButton = authenticated && userHandle === userInfo?.credentials?.handle ? (
        <DeleteHolla hollaId={hollaId}/>
    ) : null

    return (
        <Card className={classes.card}>
            <CardMedia
                image={userImage}
                alt="userImage"
                className={classes.image}
                title="Profile" />
            <CardContent className={classes.content}>
                 <Typography variant="h5" component={Link} to={`/user/${userHandle}`} color="primary" >
                    {userHandle}
                </Typography>
                {deleteButton}
                <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography variant="body1" color="textSecondary">{body}</Typography>
                <LikeButton hollaId={hollaId} />
                <span>{likeCount} Likes</span>
                <MyButton tip='comments'>
                    <ChatIcon color='primary' />
                </MyButton>
                <span>{commentCount} comments</span>
                <HollaDialog hollaId={hollaId} userHandle={userHandle} />
            </CardContent>
        </Card>
    )
}

export default Holla;