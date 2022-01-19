import { combineReducers } from  "redux"
import { reducer as form } from 'redux-form'

import { appReducer } from './app-reducer'
import { usersReducer } from './user-reducer'
import { profileReducer } from './profile-reducer'
import { authReducer} from './auth-reducer'


const rootReducer = combineReducers({app: appReducer,users: usersReducer,profile: profileReducer,auth: authReducer,form})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer