import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { makeStyles } from '@material-ui/core/styles';
import { editUserDetails } from '../../redux/actions/userActions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import MyButton from '../../util/MyButton';



const toastParam = {
  position: "top-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "light"
}

const useStyles = makeStyles({

    textField:{
      margin: '10px auto'
    },

    button2:{
      margin: '10px auto',
      position:'relative',
      float: 'right'
    },

});


const EditDetails = () => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const editDetails = useSelector(state => state.user);
  const { userInfo: { credentials }, errors } = editDetails;
  
  const [edit, setEdit] = useState({ 
      bio: credentials.bio ? credentials.bio : '', 
      website:credentials.website ? credentials.website : '', 
      location:credentials.location ? credentials.location : '', 
      open: false 
  })
  
  
  const handleOpen = () => {
    setEdit({...edit, open: true})
  }

  const handleClose = () => {
    setEdit({...edit, open: false})
  }

  const handleEdit = (e) => {
    setEdit({...edit, [e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userDetails = {
      bio: edit.bio,
      website: edit.website,
      location: edit.location
    }
    dispatch(editUserDetails(userDetails));
    if(errors){
      return toast.error(`${errors.error}, not successful!`, toastParam);
    }
    handleClose();
  }


  return (
    <>
      <MyButton placement='top' tip='Edit Details'  onClick={handleOpen} btnClassName={classes.button2}>
          <EditIcon color='primary' />
      </MyButton>
      <Dialog 
        open={edit.open}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'>
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
               <TextField
                name='bio'
                type='text'
                label='Bio'
                multiline
                rows={3}
                placeholder='A short bio about yourself'
                className={classes.textField}
                value={edit?.bio}
                onChange={handleEdit}
                fullWidth />

               <TextField
                name='website'
                type='text'
                label='Website'
                placeholder='Your personal/professional website'
                className={classes.textField}
                value={edit?.website}
                onChange={handleEdit}
                fullWidth />

               <TextField
                name='location'
                type='text'
                label='Location'
                placeholder='Where you live'
                className={classes.textField}
                value={edit?.location}
                onChange={handleEdit}
                fullWidth />

            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>Cancel</Button>
            <Button onClick={handleSubmit} color='primary'>Save</Button>
          </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  )
}

export default EditDetails