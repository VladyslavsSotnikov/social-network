import { makeStyles } from '@mui/styles';
import { VFC } from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
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
    },
  },

  activeDialogItem: {
    backgroundColor: '#4A76A8',
    color: '#fff',

    '&:hover': {
      backgroundColor: '#4A76A8',
      color: '#fff',
    },
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
});

const dialogs = [
  { id: 1, imgSrc: '/static/media/man.43005507.svg', sender: 'Ilon Mask', previewMessage: 'Some messages...' },
  { id: 2, imgSrc: '/static/media/man.43005507.svg', sender: 'Bill Gates', previewMessage: 'Some messages...' },
  { id: 3, imgSrc: '/static/media/man.43005507.svg', sender: 'Mark Zuckerberg', previewMessage: 'Some messages...' },
];

export const Dialogs: VFC = () => {
  const classes = useStyles();

  const setClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${classes.dialogItem} ${classes.activeDialogItem}` : classes.dialogItem;

  return (
    <div className={classes.dialogs}>
      <ul>
        {dialogs.map((dialog) => (
          <NavLink key={dialog.id} to={`/chats/${dialog.id}`} className={setClassName}>
            <div className={classes.dialogPhoto}>
              <img src={dialog.imgSrc} alt='man' />
            </div>
            <div>
              <div className={classes.dialogName}>{dialog.sender}</div>
              <div className={classes.dialogPreview}>{dialog.previewMessage}.</div>
            </div>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};
