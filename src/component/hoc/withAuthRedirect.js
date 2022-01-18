import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


export const withAuthRedirect = (Component) => {

    

    const ConteinerComponent = (props) => {
        const {isAuth} =  useSelector( ({auth }) => auth )
        return !isAuth? <Navigate to ="/login" /> : <Component {...props}/>
    }

    return ConteinerComponent
}

