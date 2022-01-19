import { userAPI } from '../../API/index'
import { UserType } from '../../models'

const SET_USERS = 'users/SET_USERS'
const SET_FETCHING = 'user/SET_FETCHING'
const SET_TOTAL_USER_COUNT = 'user/SET_TOTAL_USER_COUNT'
const SET_PAGE = 'user/SET_PAGE'
const FOLLOW = 'user/FOLLOW'
const UNFOLLOW = 'user/UNFOLLOW'
const FOLLOWING_IN_PROGRESS = 'user/FOLLOWING_IN_PROGRESS'

const initialState = {
    users: null as UserType[] | null,
    isFetching: true,
    count: 99,
    page: 1,
    totalPage: 0,
    followingInProgress: [] as number[]
}

type InitialStateType = typeof initialState

export const usersReducer = (state = initialState, action: Action):InitialStateType  => {
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
        default: 
            return state
    }
}


type SetUserActionType = {
    type: typeof SET_USERS;
    users: UserType[];
}

type SetFetchingActionType = {
    type: typeof SET_FETCHING;
    status: boolean;
}

type SetTotalUserCountActionType = {
    type: typeof SET_TOTAL_USER_COUNT;
    count: number;
}

type SetPageActionType = {
    type: typeof SET_PAGE;
    page: number;
}

type FollowActionType = {
    type: typeof FOLLOW;
    userId: number;
}

type UnfollowActionType = {
    type: typeof UNFOLLOW;
    userId: number;
}

type FollowingInProgressActionType = {
    type: typeof FOLLOWING_IN_PROGRESS;
    status: boolean;
    userId: number;
}

type Action =  SetUserActionType | SetFetchingActionType | SetTotalUserCountActionType | SetPageActionType | FollowActionType | UnfollowActionType | FollowingInProgressActionType;

const actions = {
    setUsers: (users: UserType[]) => ({type:SET_USERS, users}),
    setFetching: (status: boolean) => ({type:SET_FETCHING, status}), 
    setTotalUserCount: (count: number) => ({type:SET_TOTAL_USER_COUNT, count}), 
    setPage: (page: number) => ({type:SET_PAGE, page}),
    follow: (userId: number) => ({type: FOLLOW, userId}),
    unfollow: (userId: number) => ({type: UNFOLLOW, userId}),
    followingInProgress: (status: boolean, userId: number) => ({type: FOLLOWING_IN_PROGRESS, status, userId}),
}

export const getUsers = (count:number, page:number) => (dispatch: any) => {
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
}

export const followThunkCreator = (userId: number) => (dispatch: any) => {
    dispatch(actions.followingInProgress(true,userId))
    userAPI.follow(userId)
    .then(({data}) => {
        if(data.resultCode === 0){
            dispatch(actions.follow(userId))
            dispatch(actions.followingInProgress(false,userId))
        }
    })
}

export const unfollowThunkCreator = (userId: number) => (dispatch: any) => {
    dispatch(actions.followingInProgress(true,userId))
    userAPI.unfollow(userId)
    .then(({data}) =>{
        if(data.resultCode === 0){
            dispatch(actions.unfollow(userId))
            dispatch(actions.followingInProgress(false,userId))
        }
    })
}