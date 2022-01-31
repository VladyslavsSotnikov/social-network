import { makeStyles } from '@mui/styles';
import { useState, useRef } from 'react';

import man from '../../../../assests/man.svg'

const useStyles = makeStyles({
    root: {
        width: '100%',
        backgroundColor: '#fff',
        marginTop: '10px',
        borderRadius: '5px',
        padding: '5px 10px',
    },

    newPost: {
        display: 'flex',
        alignItems: 'center',
    },

    img: {
        width: '25px',
        height: '25px',
        marginRight: '15px',
    },

    input: {
        border: 'none',
        width: '100%',
    },

    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        borderTop: '1px solid #D5D5D6',
        paddingTop: '10px',
        marginTop: '10px',
    },

    button: {
        display: 'block',
        backgroundColor: '#5181B8',
        padding: '8px 45px',
        border: 'none',
        borderRadius: '2px',
        color: '#fff',

        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#6A98CC',
        }
    }
})

export const AddPost = () => {
    const postRef = useRef()
    const [editMode, setEditMode] = useState(false)
    const classes = useStyles();

    return (
        <div className={classes.root} ref={postRef}>
             <div className={classes.newPost}>
                <img src={man} alt="ava" className={classes.img} />
                <input
                    type="text" 
                    className={classes.input} 
                    placeholder="Co słychać?" 
                    onClick={() => setEditMode(true)}  
                    onBlur={() => setEditMode(false)}
                />
            </div>
            {
                editMode &&
                <div className={classes.buttonWrapper}>
                    <button className={classes.button}>Dodaj</button>
                </div>

            }
        </div>
    )
};
