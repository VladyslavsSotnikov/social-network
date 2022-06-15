import { makeStyles } from '@mui/styles';
import { VFC } from 'react';
import { Link } from 'react-router-dom';

type PropsTypes = {
  userId: number;
  name: string;
  status: string | null;
};

const useStyles = makeStyles({
  name: {
    fontSize: '12px',
    color: '#2A5885',
    fontWeight: 'bold',
    marginBottom: '7px',
  },

  status: {
    display: 'block',
    color: 'grey',
    fontWeight: 'normal',
    fontSize: '12px',
    marginTop: '5px',
  },
});

export const UserRightPanel: VFC<PropsTypes> = ({ userId, name, status }) => {
  const classes = useStyles();
  return (
    <div>
      <Link className={classes.name} to={`/profile/${userId}`}>
        {name}
      </Link>
      {status && <span className={classes.status}>{status}</span>}
    </div>
  );
};
