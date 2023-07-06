import axios from 'axios'
import { 
    LOADING_USER, 
    SET_USER,  
    SET_AUTHENTICATED, 
    SET_UNAUTHENTICATED,
    LOADING_UI, 
    SET_ERRORS, 
    CLEAR_ERRORS,
    MARK_NOTIFICATIONS_READ
} from '../types'

axios.defaults.baseURL = 'https://europe-west1-delconnect-e3289.cloudfunctions.net/api';

export const loginUser = (userData) => async(dispatch) => {
    try {
        dispatch({ type: LOADING_UI });
        const { data } = await axios.post('/login', userData);   
        setAuthorizationHeader(data.token);  
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS })
    } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error?.response?.data})
    }
}

export const signupUser = (newUserData) => async(dispatch) => {
    try {
        dispatch({ type: LOADING_UI });
        const { data } = await axios.post('/signup', newUserData);   
        setAuthorizationHeader(data.token);   
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS })
    } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error?.response?.data})
    }
}


export const getUserData = () => async(dispatch) => {
    try {
        dispatch({ type: LOADING_USER })
        const { data } = await axios.get('/user');
        if(data) dispatch({ type: SET_USER, payload: data})
    } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error?.response?.data})
    }
}


export const uploadImage = (formData) => async(dispatch) => {
    try {
        dispatch({ type: LOADING_USER })
        const { data } = await axios.post('/user/image', formData);
        if(data) dispatch(getUserData());
    } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error?.response?.data })
    }
}


export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED })
}


export const editUserDetails = (userDetails) => async(dispatch) => {
    try {
        dispatch({ type: LOADING_USER })
        const { data } = await axios.post('/user', userDetails)
        if(data) dispatch(getUserData())
    } catch (error) {
        console.log(error)
        dispatch({ type: SET_ERRORS, payload: error?.response?.data})
    }
}


export const restoreStatus = (token) => (dispatch) => {
    dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token;   
    dispatch(getUserData());
}


export const markNotificationsRead = (NotificationIds) => async(dispatch) => {
    try {
        const { data } = await axios.post('/notifications', NotificationIds);
        if(data) dispatch({type: MARK_NOTIFICATIONS_READ })
    } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error?.response?.data})
    }
}


const setAuthorizationHeader = (token)=> {
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;      
}