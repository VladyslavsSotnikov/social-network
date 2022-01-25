import { NavLink } from "react-router-dom"
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { Home, Man, Message } from "./icons";

const useStyle = makeStyles({
    root: {},

    navigation: {
        paddingLeft: '30px',
    },

    navItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        padding: '10px 14px',
        borderRadius: '4px',
        color: '#5D748A',

        '&:hover': {
            backgroundColor:'#DCE1DD',
        },

        '&>svg': {
            width: '20px',
            height: '20px',
            marginRight: '10px',
        },

    },

    activeNavItem: {
        display: 'flex',
        backgroundColor: '#DCE1DD',
        width: '100%',
        height: '100%',
    }
});

export const Sidebar = () => {
    const classes = useStyle();
    const setClassName = ({ isActive } : { isActive: boolean }) => isActive ? clsx(classes.navItem, classes.activeNavItem): classes.navItem;

    return (
        <div className={classes.root}>
            <nav className={classes.navigation}>
                <NavLink to='/profile' className={setClassName}>
                    <Home/>
                    Profil
                </NavLink>

                <NavLink to='/chats' className={setClassName}>
                    <Message/>
                    Czaty
                </NavLink>

                <NavLink to='/users' className={setClassName}>
                    <Man/>
                    Kontakty
                </NavLink>
            </nav>
        </div >
    )
};
