// Redux plugins
import { createStore, applyMiddleware, combineReducers } from "redux"
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// customereducers
import { userReducer } from './reducers/userReducer.js'
import { dataReducer } from './reducers/dataReducer.js'


const persistConfig = {
    key: "root",
    version: 1,
    storage,
}


// For persistor Logic
let user;
const userInfo =  localStorage.getItem('persist:root');
const FBIdToken = localStorage.getItem('FBIdToken') || '';

if(!FBIdToken){ 
    user = { }; localStorage.setItem('persist:root', {});
}else{ user = userInfo }


const initialState = { user };


const middleware = [thunk];

const rootReducer = combineReducers({
    user: userReducer,
    data: dataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

export const persistor = persistStore(store);