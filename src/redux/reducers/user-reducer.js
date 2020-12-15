import { userAPI } from '../../API/index'

const SET_USERS = 'users/SET_USERS'
const SET_FETCHING = 'user/SET_FETCHING'
const SET_TOTAL_USER_COUNT = 'user/SET_TOTAL_USER_COUNT'
const SET_PAGE = 'user/SET_PAGE'

const initialState = {
    users: null,
    isFetching: true,
    count: 99,
    page: 1,
    totalPage: 0
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
        default: 
            return state
    }
}

 const setUsers = (users) => ({type:SET_USERS, users}) 
 const setFetching = (status) => ({type:SET_FETCHING, status}) 
 const setTotalUserCount = (count) => ({type:SET_TOTAL_USER_COUNT, count}) 
 const setPage = (page) => ({type:SET_PAGE, page})
 
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
export default users