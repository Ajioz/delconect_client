import { 
        LOADING_USER, SET_USER, 
        SET_AUTHENTICATED, 
        SET_UNAUTHENTICATED, 
        LOADING_UI, 
        SET_ERRORS, 
        CLEAR_ERRORS, 
        LIKE_HOLLA, 
        UNLIKE_HOLLA,
        MARK_NOTIFICATIONS_READ
} from '../types'



const initialState = {
    authenticated: false,
    credentials: {},
    likes:[],
    notifications:[]
};


// USER LOGIN
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_UI:
            return { ...state, loading: true };
        
        case LOADING_USER:
            return { ...state, loading: true };

        case SET_AUTHENTICATED:
            return { ...state, authenticated: true, loading: false};

        case SET_UNAUTHENTICATED:
            return initialState;
        
        case SET_USER:
            return { loading: false, authenticated: true, userInfo: { ...action.payload } }
        
        case SET_ERRORS:
            return { ...state, loading: false, errors: action.payload }

        case CLEAR_ERRORS:
            return {...state, loading: false, errors: null };
   
        case LIKE_HOLLA:
            let newLike = {
                userHandle: state?.userInfo?.credentials?.handle, 
                hollaId: action?.payload?.hollaId 
            }
            return { ...state, likes:  state.userInfo.likes.push(newLike) };

        case UNLIKE_HOLLA:
            state.userInfo.likes = state.userInfo.likes?.filter((like) => like.hollaId !== action.payload.hollaId )
            return { ...state, likes: state.userInfo.likes };
        
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(status => status.read = true )
            return { ...state };

        default:
            return state;
    }
}