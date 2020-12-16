import { combineReducers } from  "redux"

import app from './app-reducer'
import users from './user-reducer'
import profile from './profile-reducer'
import auth from './auth-reducer'
import { reducer as form } from 'redux-form'
const rootReducer = combineReducers({app,users,profile,auth,form})

export default rootReducer