import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { makeStyles } from '@material-ui/core/styles';
import { hollaPost } from '../../redux/actions/dataActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import MyButton from '../../util/MyButton';
import { CircularProgress } from '@material-ui/core';
import _ from 'lodash'


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
    submitButton:{
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner:{
        position:'absolute'
    },
    closeButton:{
        position: 'absolute',
        left: '91%',
        top:'5%'
    },
})



const PostHolla = () => {

    const [create, setCreate] = useState({
        open: false,
        body: '',
    })
    
    const classes = useStyles()
    const dispatch = useDispatch();
    
    const postData = useSelector(state => state.data);
    const { loading, error, flag } = postData;
    
    if(!(_.isEmpty(error))){
      console.log(error?.split(':')[0])
    }

    
    const handleOpen  = () => setCreate({ ...create, open: true });

    const handleClose = () => {
        postData.error = {}
        setCreate({ ...create, open: false });
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(hollaPost({body: create.body}))
        setTimeout(() => {
            setCreate({ ...create, body: '', open: false });
        }, 5000)
    }

    useEffect(() => {
      let isMounted = true;
      if(isMounted){
        if(!(_.isEmpty(error))){
          if(error?.split(':')[0] !== 'Proxy error'){
              toast.error(`Holla not sent!`, toastParam);
              postData.error = { }
          }
        }if(flag === false )  toast.success(`Holla was sent, hurray!`, toastParam);
      }
      return () => isMounted = false;
    }, [postData, flag, error])
    

    return (
        <>
            <MyButton tip={'Post a Holla!'} onClick={handleOpen}>
                <AddIcon />
            </MyButton>
            <Dialog
                open={create.open}
                onClose={handleClose}
                fullWidth
                maxWidth='sm'>
                    <MyButton tip='close' onClick={handleClose} btnClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>Post a new Holla</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name='body'
                                label='HOLLA'
                                placeholder='Make a holla!!' 
                                multiline
                                minRows='3'
                                error={error?.body ? true : false} 
                                helperText={error?.body}
                                className={classes.textField} 
                                fullWidth
                                onChange={(e) => setCreate({...create, body: e.target.value})} />
                                <Button 
                                    type='submit' 
                                    variant='contained' 
                                    endIcon={<Icon>send</Icon>}
                                    color='primary' 
                                    className={classes.submitButton} 
                                    disabled={loading}>   
                                        { loading && (
                                              <CircularProgress size={30} className={classes.progressSpinner}/>
                                        )}
                                </Button>
                        </form>
                    </DialogContent>
            </Dialog>
            <ToastContainer />
        </>
    )
}

export default PostHolla