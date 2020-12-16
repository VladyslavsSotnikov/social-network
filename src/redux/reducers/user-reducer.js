import { userAPI } from '../../API/index'

const SET_USERS = 'users/SET_USERS'
const SET_FETCHING = 'user/SET_FETCHING'
const SET_TOTAL_USER_COUNT = 'user/SET_TOTAL_USER_COUNT'
const SET_PAGE = 'user/SET_PAGE'
const FOLLOW = 'user/FOLLOW'
const UNFOLLOW = 'user/UNFOLLOW'
const FOLLOWING_IN_PROGRESS = 'user/FOLLOWING_IN_PROGRESS'

const initialState = {
    users: null,
    isFetching: true,
    count: 99,
    page: 1,
    totalPage: 0,
    followingInProgress: []
}

const users = (state = initialState, action) => {
    switch (action.type){
        case SET_USERS: 
            return {
                ...state,
                users: action.users
            }
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.status
            }
        case SET_TOTAL_USER_COUNT:
            return {
                ...state,
                totalPage: Math.ceil(action.count/ state.count) 
            }
        case SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map((user) => {
                    if(user.id === action.userId){
                        return {...user, followed: true}
                    }
                    return user
                })
            }   
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map((user) => {
                    if(user.id === action.userId){
                        return {...user, followed: false}
                    }
                    return user
                })
            }   
        }
        case FOLLOWING_IN_PROGRESS: {
            return{
                ...state,
                followingInProgress: action.status? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(userId => userId!== action.userId)
            }
        }
        default: 
            return state
    }
}

const setUsers = (users) => ({type:SET_USERS, users}) 
const setFetching = (status) => ({type:SET_FETCHING, status}) 
const setTotalUserCount = (count) => ({type:SET_TOTAL_USER_COUNT, count}) 
const setPage = (page) => ({type:SET_PAGE, page})
const follow = (userId) => ({type: FOLLOW, userId})
const unfollow = (userId) => ({type: UNFOLLOW, userId})
const followingInProgress = (status, userId) => ({type: FOLLOWING_IN_PROGRESS, status, userId})

export const getUsers = (count, page) => (dispatch) => {
    dispatch(setFetching(true))
    userAPI.getUsers(count, page)
    .then(({data, status}) =>{
        if (status === 200){
            dispatch(setTotalUserCount(data.totalCount))
            dispatch(setUsers(data.items))
            dispatch(setFetching(false))
            dispatch(setPage(page))
        }
    }) 
}

export const followThunkCreator = (userId) => dispatch => {
    dispatch(followingInProgress(true,userId))
    userAPI.follow(userId)
    .then(({data}) => {
        if(data.resultCode === 0){
            dispatch(follow(userId))
            dispatch(followingInProgress(false,userId))
        }
    })
}

export const unfollowThunkCreator = (userId) => dispatch => {
    dispatch(followingInProgress(true,userId))
    userAPI.unfollow(userId)
    .then(({data}) =>{
        if(data.resultCode === 0){
            dispatch(unfollow(userId))
            dispatch(followingInProgress(false,userId))
        }
    })
}

export default users