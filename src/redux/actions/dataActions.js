import axios from 'axios'
import { 
    SET_HOLLAS, 
    LOADING_DATA, 
    LIKE_HOLLA, 
    UNLIKE_HOLLA, 
    SET_ERRORS, 
    DELETE_HOLLA, 
    LOADING_UI,
    POST_HOLLA, 
    CLEAR_ERRORS,
    SET_HOLLA,
    STOP_LOADING_UI,
    SNAPPING,
    STOP_SNAPPING,
    SUBMIT_COMMENT
} from '../types'




// Get all hollas
export const getHollas = () => async(dispatch) => {
    try {
        dispatch({ type: LOADING_DATA });
        const { data } = await axios.get('/holla');
        if(data){ 
            return dispatch({ type: SET_HOLLAS, payload: data})
        }
    } catch (error) {
        console.log('in error', error)
        dispatch({ type: SET_HOLLAS, payload: []})
    }
}



// Get single Holla
export const getHolla = (hollaId) => async(dispatch) => {
    try {
        dispatch({ type: SNAPPING })
        const { data } = await axios.get(`/holla/${hollaId}`)
        if(data) dispatch({ type: SET_HOLLA, payload: data })
        dispatch({ type: STOP_LOADING_UI });
        dispatch({ type: STOP_SNAPPING });
    } catch (error) {
        console.log('in error', error)
        dispatch({ type: SET_ERRORS, payload: error?.response?.data})
    }
}




// Post a holla
export const hollaPost = (newPost) => async(dispatch) => {
    try {
        dispatch({ type: LOADING_UI })
        const { data } = await axios.post('/holla', newPost)
        if(data) {
            dispatch({ type: POST_HOLLA, payload: data })
            dispatch({ type: CLEAR_ERRORS })
        }
    } catch (error) {
        console.log('in error', error)
        dispatch({ type: SET_ERRORS, payload: error?.response?.data})
    }
}



// Like a holla
export const likeHolla = (hollaId) => async(dispatch) => {
    try {
        const { data } = await axios.get(`/holla/${hollaId}/like`)
        if(data) dispatch({type: LIKE_HOLLA, payload: data})
    } catch (error) {
        console.log(error)
        dispatch({ type: SET_ERRORS, payload: error?.response })
    }
}



// unlike a holla
export const unLikeHolla = (hollaId) => async(dispatch) => {
    try {
        const { data } = await axios.get(`/holla/${hollaId}/unlike`)
        if(data){
            dispatch({ type: UNLIKE_HOLLA, payload: data})
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: SET_ERRORS, payload: error?.response })
    }
}

// Submit Comment
export const submitComment = (hollaId, commentData) => async(dispatch) => {
    try {
        const { data} = await axios.post(`/holla/${hollaId}/comment`, commentData)
        if(data) dispatch({ type: SUBMIT_COMMENT, payload: data });
        console.log({data})
        dispatch({ type: CLEAR_ERRORS })
    } catch (error) {
        console.log(error)
        dispatch({ type: SET_ERRORS, payload: error?.response?.data})
    }
}

// Delete Holla
export const deleteHolla = (hollaId) => async(dispatch) => {
    try {
        const { data } = await axios.delete(`/holla/${hollaId}`)
        if(data) dispatch({type: DELETE_HOLLA, payload: hollaId})
    } catch (error) {
        console.log('in error', error)
        dispatch({ type: SET_ERRORS, payload: error?.response?.data})
    }
}


// User data for single page
export const getUserData = (userHandle) => async(dispatch) => {
    try {
        dispatch({ type: LOADING_DATA })
        const { data } = await axios.get(`/user/${userHandle}`);
        if(data) dispatch( {type: SET_HOLLAS, payload: data.holla})
    } catch (error) {
        console.log('in error', error)
        dispatch({ type: SET_HOLLAS, payload: null})
    }
}

// action method
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}