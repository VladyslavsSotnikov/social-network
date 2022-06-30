import { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { AppStoreType } from '../../../../../../../../../redux/store';
import { profileActions } from '../../../../../../../../../redux/reducers';

import man from '../../../../../../../../../assests/man.svg';

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '5px 10px',
  },

  newPost: {
    display: 'flex',
    alignItems: 'center',
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
    },
  },
});

export const AddPost = () => {
  const { avatar } = useSelector(({ auth }: AppStoreType) => auth);

  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();

  const addNewPost = () => {
    dispatch(profileActions.addNewPost(inputValue));
    setInputValue('');
  };
  // onBlur={() => setEditMode(false)}
  return (
    <div className={classes.root}>
      <div className={classes.newPost}>
        <Avatar src={avatar ?? man} sx={{ width: 25, height: 25, marginRight: '15px' }} alt='ava' />
        <input
          type='text'
          className={classes.input}
          placeholder='Co słychać?'
          value={inputValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)}
          onClick={() => setEditMode(true)}
        />
      </div>
      {editMode && (
        <div className={classes.buttonWrapper}>
          <button className={classes.button} onClick={addNewPost}>
            Dodaj
          </button>
        </div>
      )}
    </div>
  );
};
