import React from 'react';
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'
import { useSelector } from "react-redux";
import MyButton from '../../util/MyButton';
import HomeIcon from '@material-ui/icons/Home'
import PostHolla from '../holla/PostHolla';
import Notifications from './Notifications';

const Navbar = () => {

  const navStatus = useSelector(state => state.user);
  const { authenticated } = navStatus;

  return (
    <>
      <AppBar>
        <Toolbar className="nav-container">
          {
            authenticated ? (
              <>
                <PostHolla />
                <Link to='/'>
                  <MyButton tip="Home">
                    <HomeIcon />
                  </MyButton>
                </Link>
                <Notifications />
              </>
            ) : (
              <>
                <Button color='inherit'><Link className="link" to="/">Home</Link></Button>
                <Button color='inherit'><Link className="link" to="/login">Login</Link></Button>
                <Button color='inherit'><Link className="link" to="/signup">Signup</Link></Button>
              </>
            )
          }
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar