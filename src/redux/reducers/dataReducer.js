import { 
    SET_HOLLAS, 
    LOADING_DATA, 
    LIKE_HOLLA, 
    UNLIKE_HOLLA, 
    SET_ERRORS, 
    DELETE_HOLLA,
    POST_HOLLA ,
    CLEAR_ERRORS,
    STOP_LOADING_UI,
    LOADING_UI,
    SET_HOLLA,
    SNAPPING,
    STOP_SNAPPING,
    SUBMIT_COMMENT
} from '../types'


const initialState = {
    hollas: [],
    holla: {},
    loading: false
}


export const dataReducer = (state = initialState, action) => {
    switch(action.type){

        case LOADING_DATA:
            return {...state, loading: true }
        
        case LOADING_UI:
            return { ...state, loading: true };
        
        case SNAPPING:
            return { ...state, snapping: true }
        
        case SET_HOLLAS:
            return { ...state, loading: false, hollas: action.payload }
       
        case SET_HOLLA:
            return { ...state, holla: action.payload }
        
        case LIKE_HOLLA:
        case UNLIKE_HOLLA:
            let index = state.hollas.findIndex((holla) => holla.hollaId === action.payload.hollaId);
            state.hollas[index] = action.payload;
            if (state.holla.hollaId === action.payload.hollaId) {
                state.holla = action.payload;
            }
            return { ...state }
                    
        case SET_ERRORS:
            return { ...state, error: action.payload, flag: true, commetFlag: true }

        case DELETE_HOLLA:
            let deleteIndex = state.hollas.findIndex(holla => holla.hollaId === action.payload)
            state.hollas.splice(deleteIndex, 1);
            return {...state }
        
        case POST_HOLLA:
            return { 
                ...state, 
                hollas:[
                    action.payload,
                    ...state.hollas
                ],
                flag: false
            }

        case CLEAR_ERRORS:
            return {...state, loading: false, errors: null, error: { }, flag: true, commetFlag: true };
        
        case STOP_LOADING_UI:
            return{ ...state, loading: false }
       
        case STOP_SNAPPING:
            return{ ...state, snapping: false }
        
        case SUBMIT_COMMENT:
            return { 
                ...state, 
                holla:{
                    ...state.holla,
                    comments:[action.payload, ...state.holla.comments]
                },
                commetFlag: false
            }

        default:
            return state 
        
    }
}