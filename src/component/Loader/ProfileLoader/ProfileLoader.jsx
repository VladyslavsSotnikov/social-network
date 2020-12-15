import React from 'react'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"



function ProfileLoader() {
    return (
        <Loader
            type="Circles"
            color="#4A76A8"
            height={100}
            width={100}
        />
    )
}

export default ProfileLoader

