import { FormAction, stopSubmit } from "redux-form"
import { ThunkAction } from "redux-thunk"

import { authAPI } from '../../API/index'
import { AppStoreType } from '../store'

const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_IS_AUTH = 'auth/SET_IS_AUTH'

type AuthMeDataType = {
    id: number,
    email: string,
    login: string
}

type SetIsAuthType = {
    type: typeof SET_IS_AUTH,
    status: boolean
}

type SetUserDataType = {
    type: typeof SET_USER_DATA,
    data: AuthMeDataType
}

type ActionsTypes = SetIsAuthType | SetUserDataType;

const initialState = {
    userData: null as AuthMeDataType | null,
    isAuth: false
}

type initialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type){
        case SET_USER_DATA:
            return {
                ...state,
                userData: action.data
            }
        case SET_IS_AUTH:
            return{
                ...state,
                isAuth: action.status
            }
        default: 
            return state
    }
}

const actions = {
    setUserData: (data: AuthMeDataType): SetUserDataType => ({type: SET_USER_DATA, data}),
    setIsAuth: (status: boolean): SetIsAuthType => ({type: SET_IS_AUTH, status}),
}

export const authMe = (): ThunkType => dispatch => {
    dispatch(actions.setIsAuth(false))
    return  (authAPI.authMe().then(({data}) => {
        if(data.resultCode === 0){
            dispatch(actions.setUserData(data.data))
            dispatch(actions.setIsAuth(true))
        }
    }))
}

export const login = (mail: string,password: string, remember: boolean): ThunkType => dispatch => {
    authAPI.login(mail,password, remember)
    .then(({data}) => {
        if (data.resultCode === 0) {
            dispatch(authMe())
        }
        else{
            const error = data.messages.length > 0 ? data.messages[0] : "Some error"
            dispatch(stopSubmit("login", {_error: error}))
        }
    })
}

export const logout = (): ThunkType => dispatch => {
    authAPI.logout()
    .then(({data}) => data.resultCode === 0 && dispatch(authMe()))
} 

type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionsTypes | FormAction>