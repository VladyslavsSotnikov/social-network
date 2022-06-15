import { VFC } from 'react';
import { Link } from 'react-router-dom';

import man from '../../../../../../../assests/man.svg';

type PropsType = {
  userId: number;
  userPhoto?: string | null;
};

export const UserPhoto: VFC<PropsType> = ({ userId, userPhoto }) => {
  return (
    <Link to={`/profile/${userId}`}>
      <img src={userPhoto ? userPhoto : man} alt='user' />
    </Link>
  );
};
