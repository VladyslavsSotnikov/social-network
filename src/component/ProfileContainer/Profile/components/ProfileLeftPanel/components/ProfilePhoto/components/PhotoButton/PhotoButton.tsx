import { ChangeEvent, VFC } from 'react';
import { useSelector } from 'react-redux';
import { AppStoreType } from '../../../../../../../../../redux/store';
import { ChangePhotoButton, FollowingButton } from './components';

type PropsType = {
  sendPhotoToServer: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const PhotoButton: VFC<PropsType> = ({ sendPhotoToServer }) => {
  const { isAuthorizedUser } = useSelector(({ profile }: AppStoreType) => profile);

  if (isAuthorizedUser) {
    return <ChangePhotoButton sendPhotoToServer={sendPhotoToServer} />;
  }

  return <FollowingButton />;
};
