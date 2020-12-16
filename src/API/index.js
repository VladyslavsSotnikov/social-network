import Axios from 'axios'

const instance = Axios.create({
    withCredentials: true, 
    headers: { 
        'API-KEY': '2b38e2bc-a6ac-44bc-b301-4af25ba5422e' 
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
}) 


export const userAPI = {
    getUsers(count, page ){
       return instance.get(`/users?count=${count}&page=${page}`)
    },
    follow(userId){
        return instance.post(`/follow/${userId}`)
    },
    unfollow(userId){
        return instance.delete(`/follow/${userId}`)
    }
}


export const profileAPI = {
    getUserProfile(userId){
        return instance.get(`/profile/${userId}`)
    }
}

export const authAPI = {
    authMe(){
        return instance.get(`/auth/me`)
    },
    login(email,password,rememberMe = false){
         return instance.post('/auth/login',{email, password, rememberMe})
    },
    logout(){
        return instance.delete('/auth/login')
    }
}
