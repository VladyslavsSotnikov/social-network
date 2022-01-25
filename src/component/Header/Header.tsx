import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import { logout } from '../../redux/reducers/auth-reducer';
import { AppStoreType } from '../../redux/store';

import logo from '../../assests/logo.svg';
import profilePhoto from '../../assests/man.svg';
import logoutImg from '../../assests/logout.svg';


const useStyle = makeStyles({
    root: {
        backgroundColor: '#4A76A8',
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        padding:' 0px 60px 0 60px',
    },

    authInfo: {
        display: 'flex',
        alignItems: 'center',
    },

    userName: {
        color: '#fff',
    },

    profilePhoto: {
        width:'30px',
        height: '30px',
        marginLeft: '25px',

        '&>img': { 
            width:'100%',
        }
    },

    logout: {
        width: '25px',
        height: '25px',
        marginLeft: '25px',

        '&>img': { 
            width:'100%',
        },

        '&:hover': {
            cursor: 'pointer',
        }
    }
});

export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData } = useSelector(({ auth }: AppStoreType) => auth);
    const classes = useStyle();

    const onClickLogout = () => {
        dispatch(logout());
        navigate('/login');
    }  

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <img src={logo} alt="logo" />
                <div className={classes.authInfo}>
                    <div className={classes.userName}>
                        {userData?.login}
                    </div>
                    <div className={classes.profilePhoto}>
                        <img src={profilePhoto} alt="profilePhoto" />
                    </div>
                    <div className={classes.logout} onClick={onClickLogout}>
                        <img src={logoutImg} alt="logout" />
                    </div>
                </div>
            </div>
        </div>
    )
};
