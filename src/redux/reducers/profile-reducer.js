import { profileAPI } from '../../API/index'

const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_FEACHING = 'profile/SET_FEACHING'

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
        default: 
            return state
    }
}

const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
const setFeaching = (payload) => ({type: SET_FEACHING, payload})

export const getUserProfile = (userId) => (dispatch) => {
    dispatch(setFeaching(true))
    profileAPI.getUserProfile(userId)
    .then(({data, status}) => {
        if(status === 200){
            dispatch(setUserProfile(data))
            dispatch(setFeaching(false))
        }
    })
 }

export default profile