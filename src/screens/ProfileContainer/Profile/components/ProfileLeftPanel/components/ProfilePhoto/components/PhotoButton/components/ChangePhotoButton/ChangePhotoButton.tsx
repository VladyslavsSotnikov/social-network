import { ChangeEvent, VFC } from 'react';
import { makeStyles } from '@mui/styles';

type PropTypes = {
  sendPhotoToServer: (e: ChangeEvent<HTMLInputElement>) => void;
};

const useStyles = makeStyles({
  commonButton: {
    width: '100%',
    padding: '8px 0',
    border: 'none',
    borderRadius: '2px',
    backgroundColor: '#5181B8',
    cursor: 'pointer',
    color: '#fff',
    display: 'block',
    textAlign: 'center',

    '&:hover': {
      backgroundColor: '#6A98CC',
    },
  },

  input: {
    display: 'block',
    width: '0.1px',
    height: '0.1px',
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1,
  },
});

export const ChangePhotoButton: VFC<PropTypes> = ({ sendPhotoToServer }) => {
  const classes = useStyles();

  return (
    <div>
      <label htmlFor='photo' className={classes.commonButton}>
        Zmień zdięcie
      </label>
      <input type='file' id='photo' className={classes.input} onChange={sendPhotoToServer} />
    </div>
  );
};
