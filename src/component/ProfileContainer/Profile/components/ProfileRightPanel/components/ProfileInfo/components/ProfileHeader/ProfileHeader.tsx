import { makeStyles } from '@mui/styles';
import { VFC } from 'react';

type PropsType = {
  fullName?: string;
};

const useStyles = makeStyles({
  fullName: {
    marginBottom: '10px',
  },
});

export const ProfileHeader: VFC<PropsType> = ({ fullName }) => {
  const classes = useStyles();

  return <h4 className={classes.fullName}>{fullName}</h4>;
};
