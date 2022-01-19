import { stopSubmit } from 'redux-form'
import { authAPI } from '../../API/index'

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

export type initialStateType = typeof initialState

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
    setUserData: (data: SetUserDataType) => ({type: SET_USER_DATA, data}),
    setIsAuth: (status: boolean) => ({type: SET_IS_AUTH, status})
}

export const authMe = () => (dispatch: any) => {
    dispatch(actions.setIsAuth(false))
    return  (authAPI.authMe().then(({data}) => {
        if(data.resultCode === 0){
            dispatch(actions.setUserData(data.data))
            dispatch(actions.setIsAuth(true))
        }
    }))
}

export const login = (mail: string,password: string, remember: boolean) => (dispatch:any) => {
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

export const logout = () => (dispatch: any) => {
    authAPI.logout()
    .then(({data}) => data.resultCode === 0 && dispatch(authMe()))
} 
