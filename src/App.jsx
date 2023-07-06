import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import { restoreStatus, logoutUser } from './redux/actions/userActions';
import { useDispatch } from "react-redux";
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import myTheme from './util/theme'
import jwtDecode from 'jwt-decode'
import Navbar from './components/layout/Navbar';
import User from './pages/user';
import Error from './pages/error';
import axios from 'axios'




const theme = createTheme(myTheme);

const App = () => {

  const dispatch = useDispatch();

  axios.defaults.baseURL = 'https://europe-west1-delconnect-e3289.cloudfunctions.net/api';
 
  const token = localStorage.FBIdToken;
  if(token){
    const decodedToken = jwtDecode(token)
    if(decodedToken.exp * 1000 < Date.now()){
      dispatch(logoutUser());
      localStorage.setItem('persist:root', {});
      window.location.href = '/login'
    } else {
        dispatch(restoreStatus(token))
    }
  }

 
  return (
    <MuiThemeProvider theme={theme}>
          <Router>
            <Navbar />
            <div className="container">
              <Routes>
                <Route path='/' element={ <Home />} /> 
                <Route path='/login' element={ <Login />}  /> 
                <Route path='/signup' element={ <Signup />}  /> 
                <Route path='/user/:handle' element={ <User />}  /> 
                <Route path='/user/:handle/holla/:hollaId' element={ <User />}  /> 
                <Route path="*" element={ <Error />} />  
              </Routes>
            </div>
          </Router>
    </MuiThemeProvider>
  )
}

export default App