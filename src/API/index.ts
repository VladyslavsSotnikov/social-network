import Axios from 'axios';
import {
  AuthMeDataType,
  LoginResponseDataType,
  PhotosResponseType,
  ProfileDataType,
  SecurityResponseDataType,
  UsersResponseType,
} from '../models';
import { APIResponseType, CapcthaCodeResult, ResultCodesEnum } from './API';

const instance = Axios.create({
  withCredentials: true,
  headers: {
    'API-KEY': '2b38e2bc-a6ac-44bc-b301-4af25ba5422e',
  },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export const userAPI = {
  getUsers(count: number, page: number) {
    return instance.get<UsersResponseType>(`users?count=${count}&page=${page}`).then(({ data }) => data);
  },

  follow(userId: number) {
    return instance.post<APIResponseType<{}, ResultCodesEnum>>(`follow/${userId}`).then(({ data }) => data);
  },

  unfollow(userId: number) {
    return instance.delete<APIResponseType<{}, ResultCodesEnum>>(`follow/${userId}`).then(({ data }) => data);
  },
};

export const profileAPI = {
  getUserProfile(userId: number) {
    return instance.get<ProfileDataType>(`profile/${userId}`).then(({ data }) => data);
  },

  getUserStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`).then(({ data }) => data);
  },

  updateStatus(status: string) {
    return instance
      .put<APIResponseType<{}, ResultCodesEnum>>(`profile/status/`, { status: status })
      .then(({ data }) => data);
  },

  getFollowInfo(userId: number) {
    return instance.get<boolean>(`follow/${userId}`).then(({ data }) => data);
  },

  follow(userId: number) {
    return instance.post<APIResponseType<{}, ResultCodesEnum>>(`follow/${userId}`).then(({ data }) => data);
  },

  unfollow(userId: number) {
    return instance.delete<APIResponseType<{}, ResultCodesEnum>>(`follow/${userId}`).then(({ data }) => data);
  },

  updatePhoto(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return instance
      .put<APIResponseType<PhotosResponseType, ResultCodesEnum>>(`profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(({ data }) => data);
  },

  updateProfileInfo(profile: ProfileDataType) {
    return instance.put<APIResponseType<{}, ResultCodesEnum>>(`profile`, profile).then(({ data }) => data);
  },
};

export const authAPI = {
  authMe() {
    return instance.get<APIResponseType<AuthMeDataType>>(`/auth/me`).then(({ data }) => data);
  },

  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance
      .post<APIResponseType<LoginResponseDataType, ResultCodesEnum | CapcthaCodeResult>>('/auth/login', {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then(({ data }) => data);
  },

  logout() {
    return instance.delete<APIResponseType<{}, ResultCodesEnum>>('/auth/login').then(({ data }) => data);
  },

  getCaptchaUrl() {
    return instance.get<SecurityResponseDataType>('/security/get-captcha-url').then(({ data }) => data);
  },
};
