import React, { useState, useEffect, useCallback } from 'react'
import MyButton from '../../util/MyButton';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs'
import ChatIcon from '@material-ui/icons/Chat'
import { Link, useParams } from 'react-router-dom';
import CommentForm from './CommentForm'


// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getHolla } from '../../redux/actions/dataActions';
import LikeButton from './LikeButton';
import Comment from './Comments'



const useStyles = makeStyles({

    profileImage:{
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },

    dialogContent:{
        padding: 20,
        display: 'flex',
    },

    dialogProgress:{
        margin:  '0 auto',
    },
    invisibleSeperator:{
        border: 'none',
        margin: 4
    },
    visibleSeperator:{
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0, 0.1)',
        marginBottom: 20
    },
    expandButton:{
        position:'absolute',
        left: '90%',
    },
    closeButton:{
        position: 'absolute',
        left: '91%',
        top:'5%'
    },
})

const HollaDialog = ({ hollaId, userHandle }) => {

    const [open, setOpen] = useState({
        open:false, 
        oldPath:'',
        newPath: ''
    });

    const [dialog, setDialog] = useState(false)

    const classes = useStyles();
    const dispatch = useDispatch();

    const params = useParams()

    const postData = useSelector(state => state.data);
    const { holla, snapping } = postData;


    // console.log({params})
    
    useEffect(()=>{
        let isMounted = true;
        if(isMounted && !dialog){
            if(params.hollaId) setDialog(true)
        }
        return () => isMounted = false;
    },[hollaId])

    
    const handleOpen = useCallback((e) => {

        let oldPath = window.location.pathname;
        let newPath = `/user/${userHandle}/holla/${hollaId}`;
        if(oldPath === newPath) oldPath = `/user/${userHandle}`;

        window.history.pushState(null, null, newPath)
        setOpen({ open:true, oldPath, newPath });
        dispatch(getHolla(hollaId))

    },[dispatch, hollaId]);

    
    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            if(dialog) handleOpen(); 
        }
        return () => {
            isMounted = false;
            setDialog(false);
        }
    }, [handleOpen, dialog])
    

    const handleClose = () => {
        window.history.pushState(null, null, open.oldPath)
        setOpen({...open, open: false })
    }

    const dialogeMarkup = snapping ? (
        <CircularProgress size={120} thickness={2} className={classes.dialogProgress} />
    ):(
        <Grid container spacing={2}>
            <Grid item sm={5}>
                <img src={holla?.userImage} alt="profile" className={classes.profileImage} />
            </Grid>
            <Grid item sm={7}>
                <Typography 
                    component={Link}
                    color='primary'
                    variant='h5'
                    to={`/users/${userHandle}`}>
                        @{userHandle}
                </Typography><hr className={classes.invisibleSeperator} />
                <Typography color='textSecondary' variant='body2'>
                    {dayjs(holla?.createdAt).format('h:mm a, MMM  DD YYYY')}
                </Typography><hr className={classes.invisibleSeperator} />
                <Typography variant='body1'>
                    {holla?.body}
                </Typography>
                <LikeButton hollaId={hollaId} />
                <span>{holla?.likeCount} Likes</span>
                 <MyButton tip='comments'>
                    <ChatIcon color='primary' />
                </MyButton>
                <span>{holla?.commentCount} comments</span>
            </Grid> 
            <hr className={classes.visibleSeperator} />
            <CommentForm hollaId={hollaId} setOpen={setOpen} open={open} />
            <Comment comments={holla?.comments}/>
        </Grid>
    )

    return (
        <>
            <MyButton onClick={handleOpen} tip='Expand Holla' tipClassName={classes.expandButton}>
                <UnfoldMore color='primary' />
            </MyButton>
            <Dialog
                open={open.open}
                onClose={handleClose}
                fullWidth
                maxWidth='sm'>
                     <MyButton tip='close' onClick={handleClose} btnClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                <DialogContent className={classes.dialogContent}>
                    {dialogeMarkup}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default HollaDialog