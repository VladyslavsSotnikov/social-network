import { stopSubmit } from 'redux-form'
import { authAPI } from '../../API/index'

const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_IS_AUTH = 'auth/SET_IS_AUTH'
const initialState = {
    userData: null,
    isAuth: false
}

const auth = (state = initialState, action) => {
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


const setUserData = (data) => ({type: SET_USER_DATA, data})
const setIsAuth = (status) => ({type: SET_IS_AUTH, status})

export const authMe = () => (dispatch) => {
    dispatch(setIsAuth(false))
    return  (authAPI.authMe().then(({data}) => {
        if(data.resultCode === 0){
            dispatch(setUserData(data.data))
            dispatch(setIsAuth(true))
        }
    }))
}

export const login = (mail,password, remember) => (dispatch) => {
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

export const logout = () => dispatch => {
    authAPI.logout()
    .then(({data}) => data.resultCode === 0 && dispatch(authMe()))
} 

export default auth