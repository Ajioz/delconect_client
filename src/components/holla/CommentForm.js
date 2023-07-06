import React, { useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import _ from 'lodash'
// MUI stuff
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { submitComment } from '../../redux/actions/dataActions';



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
    visibleSeperator:{
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0, 0.1)',
        marginBottom: 20
    },
});


const CommentForm = ({ hollaId, open,  setOpen }) => {

    const classes = useStyles();

    const [body, setBody] = useState({body:''});
    const dispatch = useDispatch();

    const commentData = useSelector(state => state.data);
    const { error, commetFlag  } = commentData; 

    const commenter = useSelector(state => state.user);
    const { authenticated } = commenter;

    const handleChange = (e) => {
        setBody({...body, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitComment(hollaId, body));
        setTimeout(() => {
            setBody({ ...body, body: '' });
            setOpen({...open, open: false})
        }, 5000)
    }


    useCallback(() => {
      let isMounted = true;
      if(isMounted){
        if(!(_.isEmpty(error))){
            toast.error(`Holla not sent!`, toastParam);
            commentData.error = { }
        }if(commetFlag === false )  toast.success(`Holla was sent`, toastParam);
      }
      return () => isMounted = false;
    }, [commentData, commetFlag, error])
        
    return (
        <>
            {
                authenticated ? (
                    <Grid item sm={12} style={{ textAlign:'center'}}>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name='body'
                                type='text'
                                label='Comment on holla'
                                error={error?.comment ? true : false }
                                helperText={error?.comment}
                                value={body.body}
                                fullWidth
                                className={classes.textField}
                                onChange={handleChange} />
                                <Button 
                                    type='submit' 
                                    endIcon={<Icon>send</Icon>}
                                    color='primary' 
                                    variant='contained' 
                                    className={classes.button2}>
                                        holla
                                </Button>
                                <hr className={classes.visibleSeperator} />
                        </form>
                        <ToastContainer />
                    </Grid>
                ):(null)
            }
        </>
    )
}

export default CommentForm