import Axios from 'axios'

export const userAPI = {
    getUsers(count, page ){
       return Axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${count}&page=${page}`)
    }
}


export const profileAPI = {
    getUserProfile(userId){
        return Axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
    }
}
