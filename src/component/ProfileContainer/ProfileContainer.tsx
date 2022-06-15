import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getUserProfile } from '../../redux/reducers';
import { profileActions } from '../../redux/reducers/profile-reducer';
import { AppStoreType } from '../../redux/store';
import { Profile } from './Profile/Profile';

export const ProfileContainer = () => {
  const { userData } = useSelector(({ auth }: AppStoreType) => auth);
  const params = useParams();
  const dispatch = useDispatch();

  const authorizedUserId = userData?.id;
  const userId = Number(params?.userId ?? authorizedUserId);

  useEffect(() => {
    dispatch(getUserProfile(userId));
    dispatch(profileActions.setUserId(userId));

    return function () {
      dispatch(profileActions.resetProfileState());
    };
  }, [dispatch, userId, authorizedUserId]);

  useEffect(() => {
    dispatch(profileActions.setIsAuthorizedUser(userId, authorizedUserId));
  }, [dispatch, userId, authorizedUserId]);

  return <Profile />;
};
