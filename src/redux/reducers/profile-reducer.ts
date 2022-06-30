import { ThunkAction } from 'redux-thunk';
import { ResultCodesEnum } from '../../API/API';

import { profileAPI } from '../../API/index';
import { PhotosType, ProfileDataType } from '../../models';
import { AppStoreType, InferActionsTypes } from '../store';

const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_FEACHING = 'profile/SET_FEACHING';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const SET_FOLLOW_INFO = 'profile/SET_FOLLOW_INFO';
const SET_FOLLOWING_IN_PROGRES = 'profile/SET_FOLLOWING_IN_PROGRES';
const SET_PHOTO = 'profile/SET_PHOTO';
const SET_IS_AUTHORIZED_USER = 'profile/SET_IS_AUTHORIZED_USER';
const SET_USER_ID = 'profile/SET_USER_ID';
const ADD_NEW_POST = 'profile/ADD_NEW_POST';
const DELETE_POST = 'profile/DELETE_POST';
const RESET_PROFILE_STATE = 'profile/RESET_PROFILE_STATE';

const initialState = {
  profile: null as ProfileDataType | null,
  isFeaching: true,
  followingInProgres: false,
  status: '',
  followInfo: false,
  isAuthorizedUser: false,
  userId: 0,
  posts: [
    { id: 2, author: 'Vladyslav Sotnikov', date: '01.12.2021', text: 'Junior Web UI developer', like: 20 },
    { id: 1, author: 'Vladyslav Sotnikov', date: '25.11.2020', text: 'Hi! How are you today?', like: 2 },
  ],
};

export const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case SET_FEACHING:
      return {
        ...state,
        isFeaching: action.payload,
      };
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case SET_FOLLOW_INFO:
      return {
        ...state,
        followInfo: action.status,
      };
    case SET_FOLLOWING_IN_PROGRES:
      return {
        ...state,
        followingInProgres: action.status,
      };
    case SET_PHOTO:
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos,
        } as ProfileDataType,
      };
    case SET_IS_AUTHORIZED_USER:
      return {
        ...state,
        isAuthorizedUser: action.authorizedUserId === action.userId,
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: action.userId,
      };
    case ADD_NEW_POST: {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      return {
        ...state,
        posts: [
          {
            author: 'Vladyslav Sotnikov',
            id: date.getTime(),
            like: 0,
            text: action.text,
            date: `${day}.${month}.${year}`,
          },
          ...state.posts,
        ],
      };
    }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.id),
      };
    case RESET_PROFILE_STATE: {
      return {
        ...state,
        profile: null,
        isFeaching: true,
        followingInProgres: false,
        status: '',
        followInfo: false,
        isAuthorizedUser: false,
        userId: 0,
      };
    }
    default:
      return state;
  }
};

export const profileActions = {
  setUserProfile: (profile: ProfileDataType) => ({ type: SET_USER_PROFILE, profile } as const),
  setFeaching: (payload: boolean) => ({ type: SET_FEACHING, payload } as const),
  setStatus: (status: string) => ({ type: SET_USER_STATUS, status } as const),
  setFollowInfo: (status: boolean) => ({ type: SET_FOLLOW_INFO, status } as const),
  setFollowingInProgres: (status: boolean) => ({ type: SET_FOLLOWING_IN_PROGRES, status } as const),
  setPhoto: (photos: PhotosType) => ({ type: SET_PHOTO, photos } as const),
  setIsAuthorizedUser: (userId: number, authorizedUserId?: number) =>
    ({ type: SET_IS_AUTHORIZED_USER, authorizedUserId, userId } as const),
  setUserId: (userId: number) => ({ type: SET_USER_ID, userId } as const),
  addNewPost: (text: string) => ({ type: ADD_NEW_POST, text } as const),
  delatePost: (id: number) => ({ type: DELETE_POST, id } as const),
  resetProfileState: () => ({ type: RESET_PROFILE_STATE } as const),
};

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    dispatch(profileActions.setFeaching(true));
    const data = await profileAPI.getUserProfile(userId);

    dispatch(profileActions.setUserProfile(data));
    Promise.all([dispatch(getUserStatus(userId)), dispatch(getFollowInfo(userId))]).then(() =>
      dispatch(profileActions.setFeaching(false))
    );
  };

export const getUserStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const status = await profileAPI.getUserStatus(userId);

    dispatch(profileActions.setStatus(status));
  };

export const updateStatus =
  (status: string, id: number): ThunkType =>
  async (dispatch) => {
    const { resultCode } = await profileAPI.updateStatus(status);

    if (resultCode === ResultCodesEnum.Success) {
      dispatch(getUserStatus(id));
    }
  };

export const getFollowInfo =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const status = await profileAPI.getFollowInfo(userId);

    dispatch(profileActions.setFollowInfo(status));
  };

export const follow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    dispatch(profileActions.setFollowingInProgres(true));

    const { resultCode } = await profileAPI.follow(userId);

    if (resultCode === ResultCodesEnum.Success) {
      dispatch(profileActions.setFollowInfo(true));
      dispatch(profileActions.setFollowingInProgres(false));
    }
  };

export const unfollow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    dispatch(profileActions.setFollowingInProgres(true));

    const { resultCode } = await profileAPI.unfollow(userId);

    if (resultCode === ResultCodesEnum.Success) {
      dispatch(profileActions.setFollowInfo(false));
      dispatch(profileActions.setFollowingInProgres(false));
    }
  };

export const savePhoto =
  (image: File): ThunkType =>
  async (dispatch) => {
    const { data, resultCode } = await profileAPI.updatePhoto(image);

    if (resultCode === ResultCodesEnum.Success) {
      dispatch(profileActions.setPhoto(data.photos));
    }
  };

export const saveProfile =
  (profile: ProfileDataType, userId: number): ThunkType =>
  async (dispatch) => {
    const { data, resultCode } = await profileAPI.updateProfileInfo(profile);

    if (resultCode === ResultCodesEnum.Success) {
      dispatch(getUserProfile(userId));
    } else {
      console.log(data);
    }
  };

type ActionsTypes = ReturnType<InferActionsTypes<typeof profileActions>>;
type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionsTypes>;
type InitialStateType = typeof initialState;
