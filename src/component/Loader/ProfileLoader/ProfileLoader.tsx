import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export const ProfileLoader = () => {
    return (
        <Loader
            type="Circles"
            color="#4A76A8"
            height={100}
            width={100}
        />
    )
};