import { ChangeEvent, VFC } from 'react';
import { ChangePhotoButton, FollowingButton } from './components';

type PropsType = {
  isAuthorizedUser: boolean;
  sendPhotoToServer: (e: ChangeEvent<HTMLInputElement>) => void;
  userId: number;
};

export const PhotoButton: VFC<PropsType> = ({ isAuthorizedUser, sendPhotoToServer, userId }) => {
  if (isAuthorizedUser) {
    return <ChangePhotoButton sendPhotoToServer={sendPhotoToServer} />;
  }

  return <FollowingButton userId={userId} />;
};
