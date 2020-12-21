import { profileAPI } from '../../API/index'

const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_FEACHING = 'profile/SET_FEACHING'
const SET_USER_STATUS = 'profile/SET_USER_STATUS'
const SET_FOLLOW_INFO = 'profile/SET_FOLLOW_INFO'
const SET_FOLLOWING_IN_PROGRES = 'profile/SET_FOLLOWING_IN_PROGRES'

const initialState = {
    profile: null,
    isFeaching: true,
    followingInProgres: false
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
        case SET_FOLLOW_INFO:
            return{
                ...state,
                profile: {...state.profile, followInfo: action.status}
            }
        case SET_FOLLOWING_IN_PROGRES:
            return {
                ...state,
                followingInProgres: action.status
            }
        default: 
            return state
    }
}

const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
const setFeaching = (payload) => ({type: SET_FEACHING, payload})
const setStatus = (status) => ({type: SET_USER_STATUS, status})
const setFollowInfo = (status) => ({type: SET_FOLLOW_INFO, status})
const setFollowingInProgres = (status) => ({type: SET_FOLLOWING_IN_PROGRES, status}) 

export const getUserProfile = (userId) => (dispatch) => {

    dispatch(setFeaching(true))

    profileAPI.getUserProfile(userId)
    .then(({data, status}) => {

        if(status === 200){
            dispatch(setUserProfile(data))
            dispatch( getUserStatus(userId))
            .then(()=> dispatch(getFollowInfo(userId)))
            .then(() => dispatch(setFeaching(false)))
        }

    })
 }

 export const getUserStatus = (userId) => dispatch => {
    return profileAPI.getUserStatus(userId)
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

export const getFollowInfo = (userId) => dispatch => {
    return profileAPI.getFollowInfo(userId)
    .then(({data}) => dispatch(setFollowInfo(data)))
}

export const follow = userId => dispatch => {
    dispatch(setFollowingInProgres(true))
    profileAPI.follow(userId)
    .then(({data}) => {
        if( data.resultCode === 0) {
            dispatch(setFollowInfo(true))
            dispatch(setFollowingInProgres(false))
        }
    })
}
export const unfollow = userId => dispatch => {
    dispatch(setFollowingInProgres(true))
    profileAPI.unfollow(userId)
    .then(({data}) => {
        if( data.resultCode === 0) {
            dispatch(setFollowInfo(false))
            dispatch(setFollowingInProgres(false))
        }
    })
}
export default profile