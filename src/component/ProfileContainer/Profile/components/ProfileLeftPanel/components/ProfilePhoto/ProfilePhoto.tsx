import { ChangeEvent, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { savePhoto } from '../../../../../../../redux/reducers';
import { Photo, PhotoButton } from './components';

type ProfilePhotoProps = {
  profilePhoto?: string | null;
};

const useStyles = makeStyles({
  leftPanel: {
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '10px',
  },
});

export const ProfilePhoto: VFC<ProfilePhotoProps> = ({ profilePhoto }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const sendPhotoToServer = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      dispatch(savePhoto(e.target.files[0]));
    }
  };

  return (
    <div className={classes.leftPanel}>
      <Photo profilePhoto={profilePhoto} />
      <PhotoButton sendPhotoToServer={sendPhotoToServer} />
    </div>
  );
};
