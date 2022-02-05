import { ThunkAction } from "redux-thunk"

import { profileAPI } from '../../API/index'
import { PhotosType, ProfileDataType } from '../../models'
import { AppStoreType, InferActionsTypes } from '../store'

const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_FEACHING = 'profile/SET_FEACHING';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const SET_FOLLOW_INFO = 'profile/SET_FOLLOW_INFO';
const SET_FOLLOWING_IN_PROGRES = 'profile/SET_FOLLOWING_IN_PROGRES';
const SET_PHOTO = 'profile/SET_PHOTO';
const RESET_PROFILE_STATE = 'profile/RESET_PROFILE_STATE';

const initialState = {
    profile: null as ProfileDataType | null,
    isFeaching: true,
    followingInProgres: false,
    status: '',
    followInfo:false,
};

export const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
                status: action.status,
            }
        case SET_FOLLOW_INFO:
            return{
                ...state,
                followInfo: action.status
            }
        case SET_FOLLOWING_IN_PROGRES:
            return {
                ...state,
                followingInProgres: action.status
            }
        case SET_PHOTO:
            return{
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileDataType,
            }
        case RESET_PROFILE_STATE: {
            return initialState
        }
        default: 
            return state
    }
};

const actions = {
    setUserProfile: (profile:ProfileDataType)=> ({type: SET_USER_PROFILE, profile} as const),
    setFeaching: (payload: boolean) => ({type: SET_FEACHING, payload} as const),
    setStatus: (status:string) => ({type: SET_USER_STATUS, status} as const),
    setFollowInfo: (status: boolean) => ({type: SET_FOLLOW_INFO, status} as const),
    setFollowingInProgres: (status: boolean) => ({type: SET_FOLLOWING_IN_PROGRES, status} as const) ,
    setPhoto: (photos: PhotosType) => ({type: SET_PHOTO, photos} as const),
    resetProfileState: ()  => ({type: RESET_PROFILE_STATE} as const),
};

export const getUserProfile = (userId: number):ThunkType => (dispatch) => {
    dispatch(actions.setFeaching(true))
    profileAPI.getUserProfile(userId)
    .then(({ data, status }) => {
        if(status === 200){
            dispatch(actions.setUserProfile(data))
            const promise = dispatch( getUserStatus(userId));
            Promise.all([promise])
            .then(()=> dispatch(getFollowInfo(userId)))
            .then(() => dispatch(actions.setFeaching(false)))
        }

    })
 };

 export const getUserStatus = (userId:number):ThunkType => (dispatch) => {
    return profileAPI.getUserStatus(userId)
    .then(({data}) => dispatch(actions.setStatus(data)))
 };

export const updateStatus = (status:string, id: number): ThunkType => (dispatch) => {
    profileAPI.updateStatus(status)
    .then(({data}) => {
        if(data.resultCode === 0){
            dispatch(getUserStatus(id)) 
        }
    })
};

export const getFollowInfo = (userId: number):ThunkType => (dispatch) => {
    return profileAPI.getFollowInfo(userId)
    .then(({data}) => dispatch(actions.setFollowInfo(data)))
};

export const follow = (userId: number):ThunkType => (dispatch) => {
    dispatch(actions.setFollowingInProgres(true))
    profileAPI.follow(userId)
    .then(({data}) => {
        if( data.resultCode === 0) {
            dispatch(actions.setFollowInfo(true))
            dispatch(actions.setFollowingInProgres(false))
        }
    })
};

export const unfollow = (userId: number):ThunkType => (dispatch) => {
    dispatch(actions.setFollowingInProgres(true))

    profileAPI.unfollow(userId)
    .then(({data}) => {
        if( data.resultCode === 0) {
            dispatch(actions.setFollowInfo(false))
            dispatch(actions.setFollowingInProgres(false))
        }
    })
};

export const savePhoto = (image: File):ThunkType => (dispatch) => {
    profileAPI.updatePhoto(image)
    .then(({data}) =>{
        if (data.resultCode === 0) {
            dispatch(actions.setPhoto(data.data.photos))
        }
    })
};

export const saveProfile = (profile:ProfileDataType, userId: number):ThunkType => (dispatch) => {
    return profileAPI.updateProfileInfo(profile)
    .then(({data}) => {
        if(data.resultCode === 0){
            dispatch(getUserProfile(userId))
        }
        else{
            console.log(data)
        }
    })
};

export const resetProfileState = ():ThunkType => dispatch => {
    dispatch(actions.resetProfileState());
}

type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>;
type ThunkType = ThunkAction<void, AppStoreType,  unknown, ActionsTypes>;
type InitialStateType = typeof initialState;
