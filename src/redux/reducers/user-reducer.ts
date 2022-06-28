import { ThunkAction } from 'redux-thunk';
import { ResultCodesEnum } from '../../API/API';

import { userAPI } from '../../API/index';
import { UserType } from '../../models';
import { AppStoreType, InferActionsTypes } from '../store';

const SET_USERS = 'users/SET_USERS';
const SET_FETCHING = 'user/SET_FETCHING';
const SET_TOTAL_USER_COUNT = 'user/SET_TOTAL_USER_COUNT';
const SET_PAGE = 'user/SET_PAGE';
const FOLLOW = 'user/FOLLOW';
const UNFOLLOW = 'user/UNFOLLOW';
const FOLLOWING_IN_PROGRESS = 'user/FOLLOWING_IN_PROGRESS';
const SET_INITIAL_STATE = 'user/SET_INITIAL_STATE';
const SET_TOTAL_PAGES = 'user/SET_TOTAL_PAGES';

const initialState = {
  users: null as UserType[] | null,
  isFetching: true,
  count: 40,
  page: 1,
  pages: [] as number[],
  totalPage: 0,
  followingInProgress: [] as number[],
};

export const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_FETCHING:
      return {
        ...state,
        isFetching: action.status,
      };
    case SET_TOTAL_USER_COUNT:
      return {
        ...state,
        totalPage: Math.ceil(action.count / state.count),
      };
    case SET_PAGE: {
      return {
        ...state,
        page: action.page,
      };
    }
    case SET_TOTAL_PAGES: {
      return {
        ...state,
        pages: Array(action.totalPages)
          .fill(null)
          .map((el, index) => index + 1),
      };
    }
    case FOLLOW: {
      return {
        ...state,
        users: state.users?.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }) as UserType[],
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: state.users?.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
        }) as UserType[],
      };
    }
    case FOLLOWING_IN_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.status
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((userId) => userId !== action.userId),
      };
    }
    case SET_INITIAL_STATE: {
      return initialState;
    }
    default:
      return state;
  }
};

export const usersActions = {
  setUsers: (users: UserType[]) => ({ type: SET_USERS, users } as const),
  setFetching: (status: boolean) => ({ type: SET_FETCHING, status } as const),
  setTotalUserCount: (count: number) => ({ type: SET_TOTAL_USER_COUNT, count } as const),
  setPage: (page: number) => ({ type: SET_PAGE, page } as const),
  setPages: (totalPages: number) => ({ type: SET_TOTAL_PAGES, totalPages } as const),
  follow: (userId: number) => ({ type: FOLLOW, userId } as const),
  unfollow: (userId: number) => ({ type: UNFOLLOW, userId } as const),
  followingInProgress: (status: boolean, userId: number) => ({ type: FOLLOWING_IN_PROGRESS, status, userId } as const),
  setInitialState: () => ({ type: SET_INITIAL_STATE } as const),
};

export const getUsers =
  (count: number, page: number): ThunkType =>
  async (dispatch) => {
    dispatch(usersActions.setFetching(true));
    const { items, totalCount } = await userAPI.getUsers(count, page);

    dispatch(usersActions.setTotalUserCount(totalCount));
    dispatch(usersActions.setUsers(items));
    dispatch(usersActions.setFetching(false));
    dispatch(usersActions.setPage(page));
  };

export const followThunkCreator =
  (userId: number): ThunkType =>
  async (dispatch) => {
    dispatch(usersActions.followingInProgress(true, userId));
    const { resultCode } = await userAPI.follow(userId);

    if (resultCode === ResultCodesEnum.Success) {
      dispatch(usersActions.follow(userId));
      dispatch(usersActions.followingInProgress(false, userId));
    }
  };

export const unfollowThunkCreator =
  (userId: number): ThunkType =>
  async (dispatch) => {
    dispatch(usersActions.followingInProgress(true, userId));
    const { resultCode } = await userAPI.unfollow(userId);

    if (resultCode === ResultCodesEnum.Success) {
      dispatch(usersActions.unfollow(userId));
      dispatch(usersActions.followingInProgress(false, userId));
    }
  };

type ActionsTypes = ReturnType<InferActionsTypes<typeof usersActions>>;
type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionsTypes>;
type InitialStateType = typeof initialState;
