import { authMe } from './auth-reducer'


type SetInitializedType = {
    type: typeof SET_INITIALIZED,
    status: boolean
}

type ActionTypes = SetInitializedType

const initialState = {
    initialized: false,
}

type InitialStateType = typeof initialState

const SET_INITIALIZED = 'app/SET_INITIALIZED'

export const appReducer = (state = initialState, action: ActionTypes):InitialStateType  => {
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
    setInitialized: (status: boolean) => ({type: SET_INITIALIZED, status})
}

export const  initializedTC = () => (dispatch: any) => {
    dispatch(authMe()).then(() => dispatch(actions.setInitialized(true)))
}
