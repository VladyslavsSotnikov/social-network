import { combineReducers } from  "redux"
import { reducer as form } from 'redux-form'

import { appReducer } from './app-reducer'
import users from './user-reducer'
import profile from './profile-reducer'
import { authReducer} from './auth-reducer'


const rootReducer = combineReducers({app: appReducer,users,profile,auth: authReducer,form})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer