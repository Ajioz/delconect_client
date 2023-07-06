import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, useNavigate  } from "react-router-dom";
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AppIcon from '../images/login.png'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../redux/actions/userActions'


const useStyles = makeStyles({
    formContainer: {
        textAlign: 'center'
    },

    textField:{
      margin: '10px auto'
    },

    customError:{
      color:'red',
      fontSize: '0.8rem',
      marginTop: 10
    },

    progress:{
      position: 'absolute',
    },
    img:{
      width: 120,
      margin: '20px auto'
    },

    LoginButton:{
      margin: '10px auto',
      position:'relative',
    },

    pageTitle:{
      margin: '10px auto',
      color: '#333',
      fontSize: '40px',
      fontWeight: 500
    },
});

const Login = () => {

  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector(state => state.user);
  const { loading, authenticated , errors } = userLogin;

  const [login, setLogin] = useState({ email: '', password: '',  errors: {} });

  const handleChange = (e) => {
    setLogin({...login, [e.target.name]:e.target.value})
  }


  useEffect(() => {
    let isMounted = true;
    if(isMounted){
      if(authenticated) navigate('/')
    }
    return () => isMounted = false;
  }, [authenticated, navigate])
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    const userData = { email: login.email, password: login.password };
    dispatch(loginUser(userData));
  }
  
  return (
    <>
        <Grid container className={classes.formContainer}>
            <Grid item sm></Grid>
            <Grid item sm> 
              <img src={AppIcon} alt="loginIcon" className={classes.img}/>
              <Typography variant="h2"className={classes.pageTitle}>
                  Login
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField 
                  id='email' name='email' 
                  type='email' label='Email' helperText={errors?.email}
                  error={errors?.email ? true : false}
                  className={classes.textField}
                  value={login.email}  onChange={handleChange}  fullWidth />
                <TextField 
                  id='password' name='password' 
                  type='password' label='password'  helperText={errors?.password}
                  error={errors?.password ? true : false}
                  className={classes.textField}
                  value={login.password}  onChange={handleChange}  fullWidth />

                {errors?.general && (
                  <Typography variant='body2' className={classes.customError}>
                    {errors?.general}
                  </Typography>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    type='submit'
                    className={classes.LoginButton}
                    endIcon={<Icon>send</Icon>}
                    disabled={loading}>  
                    {loading && (<CircularProgress size={25} className={classes.progress}/>)}
                    login
                  </Button>
                  <small><br/>
                  Don't have an account ? sign up <Link to='/signup' style={{color:'darkblue'}}>here</Link></small>
              </form>
            </Grid>
            <Grid item sm></Grid>
        </Grid>
    </>
  )
}


export default Login