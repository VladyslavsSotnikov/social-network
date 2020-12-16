import { authMe } from "./auth-reducer"

const SET_INITIALIZED = "app/SET_INITIALIZED"

const initialState = {
    initialized: false
}

const app = (state = initialState, action) => {
    switch (action.type){
        case SET_INITIALIZED:
            return{
                ...state,
                initialized: action.status
            }
        default: 
            return state
    }
}

const setInitialized = (status) => ({type: SET_INITIALIZED, status})

export const  initializedTC = () => (dispatch) => {
    dispatch(authMe()).then(() => dispatch(setInitialized(true)))
}

export default app