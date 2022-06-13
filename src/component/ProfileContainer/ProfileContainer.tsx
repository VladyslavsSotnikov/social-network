import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserProfile, resetProfileState } from '../../redux/reducers';
import { AppStoreType } from '../../redux/store';
import { Profile } from './Profile';

export const ProfileContainer = () => {
  const { userData } = useSelector(({ auth }: AppStoreType) => auth);
  const params = useParams();
  const dispatch = useDispatch();

  const authorizedUserId = userData?.id;
  const userId = Number(params?.userId ?? authorizedUserId);

  useEffect(() => {
    dispatch(getUserProfile(userId));

    return function () {
      dispatch(resetProfileState());
    };
  }, [dispatch, userId]);

  return <Profile authorizedUserId={authorizedUserId} userId={userId} />;
};
