import { makeStyles } from "@mui/styles";
import { NavLink } from "react-router-dom";

import man from '../../assests/man.svg';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

const useStyles = makeStyles({
    chats: {
        display: 'flex',
    },

    dialogs: {
        width: '230px',
    },

    dialogItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '7px 10px',
        borderRadius: '5px',
        marginBottom: '5px',
        transition: 'all .1s ease-in-out',

        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#fff',
        }
    },

    activeDialogItem: {
        backgroundColor: '#4A76A8',
        color: '#fff',

        '&:hover': {
            backgroundColor: '#4A76A8',
            color: '#fff',
        }
    },

    dialogPhoto: {
        marginRight: '10px',
    },

    dialogName: {
        fontSize: '12px',
        fontWeight: 'bold',
    },

    dialogPreview: {
        fontSize: '12px',
    },

    messages: {
        marginLeft: '40px',
    },

    messageItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    },

    messagePhoto: {
        marginRight: '15px',

        '&>img': {
            width: '30px',
            height: '30px',
        }
    },

    messageContent: {
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: '200px',
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '5px',
    },

    messageTime: {
        opacity: '.22',
        marginLeft: '20px',
    },

    messageInput: {
        border: '1px solid #DDDDDD',
        padding: '10px 15px',
        borderRadius: '5px',
        minWidth: '300px',
        marginRight: '30px',
    }
});

export const Chats = withAuthRedirect(() => {
    const classes = useStyles();
    const setClassName = ({ isActive } : { isActive: boolean }) => isActive ? `${classes.dialogItem} ${classes.activeDialogItem}`: classes.dialogItem;

    return (
        <div className={classes.chats}>
            <div className={classes.dialogs}>
                <ul>
                    <NavLink to='/chats/1' className={setClassName}>
                        <div className={classes.dialogPhoto}>
                            <img src={man} alt="man" />
                        </div>
                        <div>
                            <div className={classes.dialogName}>Vladyslav Sotnikov</div>
                            <div className={classes.dialogPreview}>Some messages...</div>
                        </div>
                    </NavLink>
                    <NavLink to='/chats/2' className={setClassName}>
                        <div className={classes.dialogPhoto}>
                            <img src={man} alt="man" />
                        </div>
                        <div>
                            <div className={classes.dialogName}>Vladyslav Sotnikov</div>
                            <div className={classes.dialogPreview}>Some messages...</div>
                        </div>
                    </NavLink>
                    <NavLink to='/chats/3' className={setClassName}>
                        <div className={classes.dialogPhoto}>
                            <img src={man} alt="man" />
                        </div>
                        <div>
                            <div className={classes.dialogName}>Vladyslav Sotnikov</div>
                            <div className={classes.dialogPreview}>Some messages...</div>
                        </div>
                    </NavLink>

                </ul>
            </div>
            <div className={classes.messages}>
                <div>
                    <div className={classes.messageItem}>
                        <div className={classes.messagePhoto}>
                            <img src={man} alt="man" />
                        </div>
                        <div className={classes.messageContent}>
                            <p>Co słychać?</p>
                            <span className={classes.messageTime}>17:55</span>
                        </div>
                    </div>
                    <div className={classes.messageItem}>
                        <div className={classes.messagePhoto}>
                            <img src={man} alt="man" />
                        </div>
                        <div className={classes.messageContent}>
                            <p>Co słychać?</p>
                            <span className={classes.messageTime}>17:55</span>
                        </div>
                    </div>
                    <div className={classes.messageItem}>
                        <div className={classes.messagePhoto}>
                            <img src={man} alt="man" />
                        </div>
                        <div className={classes.messageContent}>
                            <p>I am junior React developer</p>
                            <span className={classes.messageTime}>17:57</span>
                        </div>
                    </div>
                </div>
                <div>
                    <input type="text" className={classes.messageInput} placeholder="Wpisz wiadomość ..." />
                    <button type="submit" className="chats__message-btn" > Odeśij</button>
                </div>
            </div>
        </div>
    )
});
