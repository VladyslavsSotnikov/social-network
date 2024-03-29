import { FormAction, stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { CapcthaCodeResult, ResultCodesEnum } from '../../API/API';

import { authAPI, profileAPI } from '../../API/index';
import { AuthMeDataType } from '../../models';
import { AppStoreType, InferActionsTypes } from '../store';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_IS_AUTH = 'auth/SET_IS_AUTH';
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL';
const SET_AVATAR = 'auth/SET_AVATAR';

const initialState = {
  userData: null as AuthMeDataType | null,
  isAuth: false,
  captchaUrl: null as string | null,
  avatar: null as string | null,
};

export const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.data,
      };
    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.status,
      };
    case SET_CAPTCHA_URL:
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      };
    case SET_AVATAR:
      return {
        ...state,
        avatar: action.photo,
      };
    default:
      return state;
  }
};

const actions = {
  setUserData: (data: AuthMeDataType | null) => ({ type: 'auth/SET_USER_DATA', data } as const),
  setIsAuth: (status: boolean) => ({ type: SET_IS_AUTH, status } as const),
  setCaptchaUrl: (captchaUrl: string | null) => ({ type: SET_CAPTCHA_URL, captchaUrl } as const),
  setAvatar: (photo: string | null) => ({ type: SET_AVATAR, photo } as const),
};

export const authMe = (): ThunkType => async (dispatch) => {
  const { data, resultCode } = await authAPI.authMe();

  if (resultCode === ResultCodesEnum.Success) {
    const profile = await profileAPI.getUserProfile(data.id);

    dispatch(actions.setUserData(data));
    dispatch(actions.setAvatar(profile.photos.small));
    dispatch(actions.setIsAuth(true));
  }
};

export const login =
  (mail: string, password: string, remember: boolean, captcha: string | null): ThunkType =>
  async (dispatch) => {
    const { resultCode, messages } = await authAPI.login(mail, password, remember, captcha);

    if (resultCode === ResultCodesEnum.Success) {
      dispatch(authMe());
      dispatch(actions.setCaptchaUrl(null));
    } else if (resultCode === CapcthaCodeResult.CaptchaIsRequired) {
      dispatch(getCaptchaUrl());
    } else {
      const error = messages.length > 0 ? messages[0] : 'Some error';
      dispatch(stopSubmit('login', { _error: error }));
    }
  };

const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const { url } = await authAPI.getCaptchaUrl();

  dispatch(actions.setCaptchaUrl(url));
};

export const logout = (): ThunkType => async (dispatch) => {
  const { resultCode } = await authAPI.logout();

  if (resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setUserData(null));
    dispatch(actions.setIsAuth(false));
    dispatch(actions.setAvatar(null));
  }
};

type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>;
type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionsTypes | FormAction>;
type initialStateType = typeof initialState;
