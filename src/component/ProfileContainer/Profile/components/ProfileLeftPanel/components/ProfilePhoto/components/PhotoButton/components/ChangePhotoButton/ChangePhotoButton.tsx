import { makeStyles } from '@mui/styles';
import { ChangeEvent, VFC } from 'react';

type PropsType = {
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
});

export const ChangePhotoButton: VFC<PropsType> = ({ sendPhotoToServer }) => {
  const classes = useStyles();

  return (
    <div>
      <label htmlFor='photo' className={classes.commonButton}>
        Zmień zdięcie
      </label>
      <input type='file' id='photo' onChange={sendPhotoToServer} />
    </div>
  );
};
