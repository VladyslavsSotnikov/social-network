import { ThunkAction } from 'redux-thunk';
import { AppStoreType, InferActionsTypes } from '../store';
import { authMe } from './auth-reducer';

const SET_INITIALIZED = 'app/SET_INITIALIZED';

const initialState = {
  initialized: false,
};

export const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: action.status,
      };

    default:
      return state;
  }
};

export const actions = {
  setInitialized: (status: boolean) => ({ type: SET_INITIALIZED, status } as const),
};

export const initializedTC = (): ThunkType => (dispatch) => {
  const promise = dispatch(authMe());
  Promise.all([promise]).then(() => dispatch(actions.setInitialized(true)));
};

type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>;
type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionsTypes>;
type InitialStateType = typeof initialState;
