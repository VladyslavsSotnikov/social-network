import { ChangeEvent, VFC } from 'react';
import { useSelector } from 'react-redux';

import { ChangePhotoButton, FollowingButton } from './components';

import { AppStoreType } from '../../../../../../../../../redux/store';

type PropTypes = {
  sendPhotoToServer: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const PhotoButton: VFC<PropTypes> = ({ sendPhotoToServer }) => {
  const { isAuthorizedUser } = useSelector(({ profile }: AppStoreType) => profile);

  if (isAuthorizedUser) {
    return <ChangePhotoButton sendPhotoToServer={sendPhotoToServer} />;
  }

  return <FollowingButton />;
};
