import Axios from 'axios'
import { ProfileDataType } from '../models'

const instance = Axios.create({
    withCredentials: true, 
    headers: { 
        'API-KEY': '2b38e2bc-a6ac-44bc-b301-4af25ba5422e' 
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
}) 


export const userAPI = {
    getUsers(count: number, page:number ){
       return instance.get(`users?count=${count}&page=${page}`)
    },

    follow(userId:number){
        return instance.post(`follow/${userId}`)
    },

    unfollow(userId:number){
        return instance.delete(`follow/${userId}`)
    }
}


export const profileAPI = {
    getUserProfile(userId:number){
        return instance.get(`profile/${userId}`)
    },

    getUserStatus(userId:number){
        return instance.get(`profile/status/${userId}`)
    },

    updateStatus(status:string){
        return instance.put(`profile/status/`, {status: status})
    },

    getFollowInfo(userId:number){
        return instance.get(`follow/${userId}`)
    },
    
    follow(userId:number){
        return instance.post(`follow/${userId}`)
    },

    unfollow(userId:number){
        return instance.delete(`follow/${userId}`)
    },

    updatePhoto(image:File){
        const formData = new FormData()
        formData.append("image", image)
        return instance.put(`profile/photo`, formData , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    updateProfileInfo(profile:ProfileDataType){
        return instance.put(`profile`,profile)
    }
}

export const authAPI = {
    authMe(){
        return instance.get(`/auth/me`)
    },

    login(email:string,password:string,rememberMe = false){
         return instance.post('/auth/login',{email, password, rememberMe})
    },
    
    logout(){
        return instance.delete('/auth/login')
    }
}
