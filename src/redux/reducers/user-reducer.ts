import { ThunkAction } from 'redux-thunk'

import { userAPI } from '../../API/index'
import { UserType } from '../../models'
import { AppStoreType, InferActionsTypes } from '../store'

const SET_USERS = 'users/SET_USERS';
const SET_FETCHING = 'user/SET_FETCHING';
const SET_TOTAL_USER_COUNT = 'user/SET_TOTAL_USER_COUNT';
const SET_PAGE = 'user/SET_PAGE';
const FOLLOW = 'user/FOLLOW';
const UNFOLLOW = 'user/UNFOLLOW';
const FOLLOWING_IN_PROGRESS = 'user/FOLLOWING_IN_PROGRESS';
const SET_INITIAL_STATE = 'user/SET_INITIAL_STATE';


const initialState = {
    users: null as UserType[] | null,
    isFetching: true,
    count: 40,
    page: 1,
    totalPage: 0,
    followingInProgress: [] as number[]
};

export const usersReducer = (state = initialState, action: ActionsTypes):InitialStateType  => {
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
                users: state.users?.map((user) => {
                    if(user.id === action.userId){
                        return {...user, followed: true}
                    }
                    return user
                }) as UserType []
            }   
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users?.map((user) => {
                    if(user.id === action.userId){
                        return {...user, followed: false}
                    }
                    return user
                }) as UserType []
            }   
        }
        case FOLLOWING_IN_PROGRESS: {
            return{
                ...state,
                followingInProgress: action.status? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(userId => userId!== action.userId)
            }
        }
        case SET_INITIAL_STATE: {
            return initialState
        }
        default: 
            return state
    }
};

const actions = {
    setUsers: (users: UserType[]) => ({type:SET_USERS, users} as const),
    setFetching: (status: boolean) => ({type:SET_FETCHING, status} as const), 
    setTotalUserCount: (count: number) => ({type:SET_TOTAL_USER_COUNT, count} as const), 
    setPage: (page: number) => ({type:SET_PAGE, page} as const),
    follow: (userId: number) => ({type: FOLLOW, userId} as const),
    unfollow: (userId: number) => ({type: UNFOLLOW, userId} as const),
    followingInProgress: (status: boolean, userId: number) => ({type: FOLLOWING_IN_PROGRESS, status, userId} as const),
    setInitialState: () => ({type: SET_INITIAL_STATE} as const)
};

export const getUsers = (count:number, page:number):ThunkType => (dispatch) => {
    dispatch(actions.setFetching(true))
    userAPI.getUsers(count, page)
    .then(({data, status}) =>{
        if (status === 200){
            dispatch(actions.setTotalUserCount(data.totalCount))
            dispatch(actions.setUsers(data.items))
            dispatch(actions.setFetching(false))
            dispatch(actions.setPage(page))
        }
    }) 
};

export const followThunkCreator = (userId: number):ThunkType => (dispatch) => {
    dispatch(actions.followingInProgress(true,userId))
    userAPI.follow(userId)
    .then(({data}) => {
        if(data.resultCode === 0){
            dispatch(actions.follow(userId))
            dispatch(actions.followingInProgress(false,userId))
        }
    })
};

export const unfollowThunkCreator = (userId: number):ThunkType => (dispatch) => {
    dispatch(actions.followingInProgress(true,userId))
    userAPI.unfollow(userId)
    .then(({data}) =>{
        if(data.resultCode === 0){
            dispatch(actions.unfollow(userId))
            dispatch(actions.followingInProgress(false,userId))
        }
    })
};

export const resetUsersState = ():ThunkType => (dispatch) => {
    dispatch(actions.setInitialState())
} ;

type ActionsTypes =  ReturnType<InferActionsTypes<typeof actions>>;
type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionsTypes>;
type InitialStateType = typeof initialState;