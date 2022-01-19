import { profileAPI } from '../../API/index'
import { PhotosType, ProfileDataType } from '../../models'

const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_FEACHING = 'profile/SET_FEACHING'
const SET_USER_STATUS = 'profile/SET_USER_STATUS'
const SET_FOLLOW_INFO = 'profile/SET_FOLLOW_INFO'
const SET_FOLLOWING_IN_PROGRES = 'profile/SET_FOLLOWING_IN_PROGRES'
const SET_PHOTO = 'profile/SET_PHOTO'

const initialState = {
    profile: null as ProfileDataType | null,
    isFeaching: true,
    followingInProgres: false,
    status: '',
    followInfo:false,
}

type InitialStateType = typeof initialState

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
        default: 
            return state
    }
}


type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE;
    profile :ProfileDataType;
}

type SetFeachingActionType = {
    type: typeof SET_FEACHING;
    payload : boolean;
}

type SetStatusActionType = {
    type: typeof SET_USER_STATUS;
    status : string;
}

type SetFollowInfoActionType = {
    type: typeof SET_FOLLOW_INFO;
    status : boolean;
}

type SetFollowingInProgresActionType = {
    type: typeof SET_FOLLOWING_IN_PROGRES;
    status : boolean;
}

type SetPhotoActionType = {
    type: typeof SET_PHOTO;
    photos : PhotosType;
}

type ActionsTypes = setUserProfileActionType | SetFeachingActionType | SetStatusActionType | SetFollowInfoActionType | SetFollowingInProgresActionType | SetPhotoActionType;

const actions = {
    setUserProfile: (profile:ProfileDataType) => ({type: SET_USER_PROFILE, profile}),
    setFeaching: (payload: boolean) => ({type: SET_FEACHING, payload}),
    setStatus: (status:string) => ({type: SET_USER_STATUS, status}),
    setFollowInfo: (status: boolean) => ({type: SET_FOLLOW_INFO, status}),
    setFollowingInProgres: (status: boolean) => ({type: SET_FOLLOWING_IN_PROGRES, status}) ,
    setPhoto: (photos: PhotosType) => ({type: SET_PHOTO, photos}),
}

export const getUserProfile = (userId: number) => (dispatch: any) => {
    dispatch(actions.setFeaching(true))

    profileAPI.getUserProfile(userId)
    .then(({data, status}) => {

        if(status === 200){
            dispatch(actions.setUserProfile(data))
            dispatch( getUserStatus(userId))
            .then(()=> dispatch(getFollowInfo(userId)))
            .then(() => dispatch(actions.setFeaching(false)))
        }

    })
 }

 export const getUserStatus = (userId:number) => (dispatch: any) => {
    return profileAPI.getUserStatus(userId)
    .then(({data}) => dispatch(actions.setStatus(data)))
 }

export const updateStatus = (status:string, id: number) => (dispatch: any) => {
    profileAPI.updateStatus(status)
    .then(({data}) => {
        if(data.resultCode === 0){
            dispatch(getUserStatus(id)) 
        }
    })
}

export const getFollowInfo = (userId: number) => (dispatch:any) => {
    return profileAPI.getFollowInfo(userId)
    .then(({data}) => dispatch(actions.setFollowInfo(data)))
}

export const follow = (userId: number) => (dispatch:any) => {
    dispatch(actions.setFollowingInProgres(true))
    profileAPI.follow(userId)
    .then(({data}) => {
        if( data.resultCode === 0) {
            dispatch(actions.setFollowInfo(true))
            dispatch(actions.setFollowingInProgres(false))
        }
    })
}
export const unfollow = (userId: boolean) => (dispatch:any) => {
    dispatch(actions.setFollowingInProgres(true))
    profileAPI.unfollow(userId)
    .then(({data}) => {
        if( data.resultCode === 0) {
            dispatch(actions.setFollowInfo(false))
            dispatch(actions.setFollowingInProgres(false))
        }
    })
}

export const savePhoto = (image: File) => (dispatch:any) =>{
    profileAPI.updatePhoto(image)
    .then(({data}) =>{
        if (data.resultCode === 0) {
            dispatch(actions.setPhoto(data.data.photos))
        }
    })
}

export const saveProfile = (profile:ProfileDataType, userId: number) => (dispatch:any) => {
    return profileAPI.updateProfileInfo(profile)
    .then(({data}) => {
        if(data.resultCode === 0){
            dispatch(getUserProfile(userId))
        }
        else{
            console.log(data)
        }
    })
}
