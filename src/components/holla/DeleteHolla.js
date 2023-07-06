import React, { useState } from 'react'
import MyButton from '../../util/MyButton';
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import _ from 'lodash'

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline'

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteHolla } from '../../redux/actions/dataActions';
import { Typography } from '@material-ui/core';



const toastParam = {
  position: "top-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "light"
}


const useStyles = makeStyles({

    deleteButton:{
        position: 'absolute',
        left: '90%',
        top: '10%'
    },
})

const DeleteHolla = ({ hollaId }) => {

    const [open, setOpen] = useState(false)

    const classes = useStyles(); 
    const dispatch = useDispatch();

    const deletePost = useSelector(state => state.data);
    let { error } = deletePost;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const hollaDelete = () => {
        dispatch(deleteHolla(hollaId));
        if(_.isEmpty(error) || error === null ){
            toast.success('Holla was successfully deleted...')
        }else return  toast.error(`${error.error}, not successful!`, toastParam);
        setOpen(false);
    }

    return (
        <>
            <MyButton 
                tip={'delete holla'} 
                onClick={handleOpen} 
                btnClassName={classes.deleteButton}>
                <DeleteOutline color='secondary'/>
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
                <DialogTitle>
                    <Typography variant='body2'>
                        Sure you want to delete this holla ? 
                    </Typography>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={hollaDelete} color='secondary'>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </>
    )
}

export default DeleteHolla