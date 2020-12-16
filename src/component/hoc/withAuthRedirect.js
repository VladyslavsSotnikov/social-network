import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'


export const withAuthRedirect = (Component) => {

    

    const ConteinerComponent = (props) => {
        const {isAuth} =  useSelector( ({auth }) => auth )
        return !isAuth? <Redirect to ="/login" /> : <Component {...props}/>
    }

    return ConteinerComponent
}

