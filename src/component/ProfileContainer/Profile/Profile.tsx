import { VFC } from 'react';
import { makeStyles } from '@mui/styles';
import { AddPost, Post, ProfileInfo, ProfileInfoLoader, ProfileLeftPanel } from './components';
import { useSelector } from 'react-redux';
import { AppStoreType } from '../../../redux/store';

interface ProfileProps {
  authorizedUserId?: number;
  userId: number;
}

const posts = [
  { id: 1, author: 'Vladyslav Sotnikov', date: '01 grd 2021', text: 'Junior Web UI developer', like: 20 },
  { id: 2, author: 'Vladyslav Sotnikov', date: '25 lis 2020', text: 'Hi! How are you today?', like: 2 },
];

const useStyles = makeStyles({
  profile: {
    display: 'flex',
  },

  leftPanel: {
    width: '230px',
    marginRight: '25px',
  },

  rightPanel: {
    flex: 1,
  },

  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
});

const AUTHORIZED_USER_INFO_HEIGHT = 559;
const NOT_AUTHORIZED_USER_INFO_HEIGHT = 517;

export const Profile: VFC<ProfileProps> = ({ authorizedUserId, userId }) => {
  const { profile, isFeaching } = useSelector(({ profile }: AppStoreType) => profile);
  const classes = useStyles();

  const profileInfoLoaderHeight =
    authorizedUserId === userId ? AUTHORIZED_USER_INFO_HEIGHT : NOT_AUTHORIZED_USER_INFO_HEIGHT;
  const isAuthorizedUser = userId === authorizedUserId;

  return (
    <div className={classes.profile}>
      <ProfileLeftPanel
        profilePhoto={profile?.photos.large}
        isFeaching={isFeaching}
        isAuthorizedUser={isAuthorizedUser}
        userId={userId}
      />
      <div className={classes.rightPanel}>
        {isFeaching ? (
          <ProfileInfoLoader height={profileInfoLoaderHeight} />
        ) : (
          <ProfileInfo profile={profile} currentUserId={userId} authUserId={authorizedUserId} />
        )}
        <AddPost />
        {posts.map((post) => (
          <Post key={post.id} author={post.author} date={post.date} text={post.text} like={post.like} />
        ))}
      </div>
    </div>
  );
};
