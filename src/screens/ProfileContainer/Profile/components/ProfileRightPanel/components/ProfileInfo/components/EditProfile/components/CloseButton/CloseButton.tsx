import { VFC } from 'react';
import { makeStyles } from '@mui/styles';

import { Close } from '../icons/Close';

type PropTypes = {
  setEditMode: (isEditMode: boolean) => void;
};

const useStyles = makeStyles({
  buttonWrapper: {
    display: 'flex',
    justifyContent: ' flex-end',
  },

  closeButton: {
    width: '30px',
    height: '30px',
    borderRadius: '100%',
    border: '1px solid #5181B8',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5px 5px 10px 0',
    transition: 'all .15s ease-in-out',

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#5181B8',
      '&>svg': {
        fill: '#fff',
      },
    },
  },
});

export const CloseButton: VFC<PropTypes> = ({ setEditMode }) => {
  const classes = useStyles();
  return (
    <div className={classes.buttonWrapper}>
      <button className={classes.closeButton} onClick={() => setEditMode(false)}>
        <Close />
      </button>
    </div>
  );
};
