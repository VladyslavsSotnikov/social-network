import { VFC } from 'react';
import { Link } from 'react-router-dom';

import man from '../../../../../../../../assests/man.svg';

type PropTypes = {
  userId: number;
  userPhoto?: string | null;
};

export const UserPhoto: VFC<PropTypes> = ({ userId, userPhoto }) => {
  return (
    <Link to={`/profile/${userId}`}>
      <img src={userPhoto ? userPhoto : man} alt='user' />
    </Link>
  );
};
