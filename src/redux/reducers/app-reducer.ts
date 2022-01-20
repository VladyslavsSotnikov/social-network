import { ThunkAction } from 'redux-thunk'
import { AppStoreType } from '../store'
import { authMe } from './auth-reducer'


type SetInitializedType = {
    type: typeof SET_INITIALIZED,
    status: boolean
}

type ActionsTypes = SetInitializedType

const initialState = {
    initialized: false,
}

type InitialStateType = typeof initialState

const SET_INITIALIZED = 'app/SET_INITIALIZED'

export const appReducer = (state = initialState, action: ActionsTypes):InitialStateType  => {
    switch (action.type){
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: action.status
            }
        
        default: 
            return state
    }
}

export const actions = {
    setInitialized: (status: boolean):SetInitializedType => ({type: SET_INITIALIZED, status})
}

export const  initializedTC = ():ThunkType => (dispatch) => {
    const promise = dispatch(authMe());
    Promise.all([promise]).then(() => dispatch(actions.setInitialized(true)))
}

type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionsTypes>
