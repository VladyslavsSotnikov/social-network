import { applyMiddleware, compose, createStore, combineReducers } from "redux"
import thunk from "redux-thunk"
import { reducer as form } from "redux-form"

import { appReducer, authReducer, profileReducer, usersReducer } from "./reducers"

const rootReducer = combineReducers({app: appReducer,users: usersReducer,profile: profileReducer,auth: authReducer,form})

// @ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

export type AppState = ReturnType<typeof rootReducer>
export default store