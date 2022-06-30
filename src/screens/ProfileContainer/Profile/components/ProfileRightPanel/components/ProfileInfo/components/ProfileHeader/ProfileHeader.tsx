import { VFC } from 'react';
import { makeStyles } from '@mui/styles';

type PropsTypes = {
  fullName?: string;
};

const useStyles = makeStyles({
  fullName: {
    marginBottom: '10px',
  },
});

export const ProfileHeader: VFC<PropsTypes> = ({ fullName }) => {
  const classes = useStyles();

  return <h4 className={classes.fullName}>{fullName}</h4>;
};
