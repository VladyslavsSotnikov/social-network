import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { follow, getUserProfile, resetProfileState, unfollow } from '../../redux/reducers';
import { AppStoreType } from '../../redux/store';
import { Profile } from './Profile';

export const ProfileContainer = () => {
  const { userData } = useSelector(({ auth }: AppStoreType) => auth);
  const { profile, isFeaching, followingInProgres, followInfo } = useSelector(({ profile }: AppStoreType) => profile);
  const params = useParams();
  const dispatch = useDispatch();

  const authorizedUserId = userData?.id;
  const userId = Number(params?.userId ?? authorizedUserId);

  const onClickFollow = (userId: number) => {
    dispatch(follow(userId));
  };

  const onClickUnfollow = (userId: number) => {
    dispatch(unfollow(userId));
  };

  useEffect(() => {
    dispatch(getUserProfile(userId));

    return function () {
      dispatch(resetProfileState());
    };
  }, [dispatch, userId]);

  return (
    <Profile
      authorizedUserId={authorizedUserId}
      userId={userId}
      followInfo={followInfo}
      followingInProgres={followingInProgres}
      isFeaching={isFeaching}
      profile={profile}
      onClickFollow={onClickFollow}
      onClickUnfollow={onClickUnfollow}
    />
  );
};
