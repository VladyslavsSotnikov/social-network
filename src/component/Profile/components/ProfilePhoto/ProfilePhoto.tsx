import { ChangeEvent, VFC } from 'react';
import { useDispatch } from 'react-redux';

import profileAvatar from '../../../../assests/profile-photo.png';
import { savePhoto } from '../../../../redux/reducers';
import { makeStyles } from '@mui/styles';

type ProfilePhotoProps = {
  photo?: string | null;
  currentUserId: number;
  authUserId?: number;
  followInfo: boolean;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  followingInProgres: boolean;
};

type ButtonType = {
  followingInProgres: boolean;
};

const useStyles = makeStyles({
  leftPanel: {
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '10px',
  },

  mainPhoto: {
    marginBottom: '5px',

    '&>img': {
      width: '100%',
    },
  },

  commonButton: ({ followingInProgres }: ButtonType) => ({
    width: '100%',
    padding: '8px 0',
    border: 'none',
    borderRadius: '2px',
    color: '#fff',
    pointerEvents: followingInProgres ? 'none' : 'auto',
    backgroundColor: followingInProgres ? '#D5D5D6' : '#5181B8',
    cursor: followingInProgres ? 'none' : 'pointer',
    display: 'block',
    textAlign: 'center',

    '&:hover': {
      backgroundColor: '#6A98CC',
    },
  }),
});

export const ProfilePhoto: VFC<ProfilePhotoProps> = ({
  photo,
  currentUserId,
  authUserId,
  followInfo,
  follow,
  unfollow,
  followingInProgres,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles({ followingInProgres });
  const isAuthorizedUser = currentUserId === authUserId;

  const sendPhotoToServer = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      dispatch(savePhoto(e.target.files[0]));
    }
  };

  return (
    <div className={classes.leftPanel}>
      <div className={classes.mainPhoto}>
        <img width={210} height={200} src={photo ? photo : profileAvatar} alt='mainPhoto' />
      </div>
      {!isAuthorizedUser ? (
        !followInfo ? (
          <button className={classes.commonButton} onClick={() => follow(currentUserId)}>
            Dodaj
          </button>
        ) : (
          <button className={classes.commonButton} onClick={() => unfollow(currentUserId)}>
            Usuń
          </button>
        )
      ) : (
        <div>
          <label htmlFor='photo' className={classes.commonButton}>
            Zmień zdięcie
          </label>
          <input type='file' id='photo' onChange={sendPhotoToServer} />
        </div>
      )}
    </div>
  );
};
