import { profileAPI } from '../../API/index'

const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_FEACHING = 'profile/SET_FEACHING'
const SET_USER_STATUS = 'profile/SET_USER_STATUS'

const initialState = {
    profile: null,
    isFeaching: true
}

const profile = (state = initialState, action) => {
    switch (action.type){
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_FEACHING:
            return{
                ...state,
                isFeaching: action.payload
            }
        case SET_USER_STATUS:
            return {
                ...state,
                profile: {...state.profile, status: action.status}
            }
        default: 
            return state
    }
}

const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
const setFeaching = (payload) => ({type: SET_FEACHING, payload})
const setStatus = (status) => ({type: SET_USER_STATUS, status})

export const getUserProfile = (userId) => (dispatch) => {
    dispatch(setFeaching(true))
    profileAPI.getUserProfile(userId)
    .then(({data, status}) => {
        if(status === 200){
            dispatch(setUserProfile(data))
            dispatch(setFeaching(false))
        }
    }).then(() => dispatch( getUserStatus(userId)))
 }

 export const getUserStatus = (userId) => dispatch => {
    profileAPI.getUserStatus(userId)
    .then(({data}) => dispatch(setStatus(data)))
 }

export const updateStatus = (status, id) => dispatch => {
    profileAPI.updateStatus(status)
    .then(({data}) => {
        if(data.resultCode === 0){
            dispatch(getUserStatus(id)) 
        }
    })
}

export default profile