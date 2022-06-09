import { FormAction, stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { ResultCodesEnum } from '../../API/API';

import { authAPI } from '../../API/index';
import { AuthMeDataType } from '../../models';
import { AppStoreType, InferActionsTypes } from '../store';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_IS_AUTH = 'auth/SET_IS_AUTH';

const initialState = {
  userData: null as AuthMeDataType | null,
  isAuth: false,
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
    default:
      return state;
  }
};

const actions = {
  setUserData: (data: AuthMeDataType | null) => ({ type: 'auth/SET_USER_DATA', data } as const),
  setIsAuth: (status: boolean) => ({ type: SET_IS_AUTH, status } as const),
};

export const authMe = (): ThunkType => async (dispatch) => {
  const { data, resultCode } = await authAPI.authMe();

  if (resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setUserData(data));
    dispatch(actions.setIsAuth(true));
  }
};

export const login =
  (mail: string, password: string, remember: boolean): ThunkType =>
  async (dispatch) => {
    const { resultCode, messages } = await authAPI.login(mail, password, remember);

    if (resultCode === ResultCodesEnum.Success) {
      dispatch(authMe());
    } else {
      const error = messages.length > 0 ? messages[0] : 'Some error';
      dispatch(stopSubmit('login', { _error: error }));
    }
  };

export const logout = (): ThunkType => (dispatch) => {
  authAPI.logout().then(({ data }) => {
    if (data.resultCode === 0) {
      dispatch(actions.setUserData(null));
      dispatch(actions.setIsAuth(false));
    }
  });
};

type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>;
type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionsTypes | FormAction>;
type initialStateType = typeof initialState;
