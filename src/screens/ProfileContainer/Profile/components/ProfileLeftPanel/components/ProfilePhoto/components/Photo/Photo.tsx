import { VFC } from 'react';
import { makeStyles } from '@mui/styles';

import profileAvatar from './profile-photo.png';

const useStyles = makeStyles({
  root: {
    marginBottom: '5px',

    '&>img': {
      width: '100%',
    },
  },
});

type PropTypes = {
  profilePhoto?: string | null;
};

export const Photo: VFC<PropTypes> = ({ profilePhoto }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img width={210} height={200} src={profilePhoto ? profilePhoto : profileAvatar} alt='avatar' />
    </div>
  );
};
