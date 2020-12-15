import { combineReducers } from  "redux"

import users from './user-reducer'
import profile from './profile-reducer'
const rootReducer = combineReducers({users,profile})

export default rootReducer