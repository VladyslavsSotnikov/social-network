import { VFC } from 'react';
import { makeStyles } from '@mui/styles';

type PropTypes = {
  openEditProfileDialog: () => void;
};

const useStyles = makeStyles({
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: '10px',
  },

  editButton: {
    width: '20%',
    padding: '8px 0',
    backgroundColor: '#5181B8',
    border: 'none',
    borderRadius: '2px',
    color: '#fff',
    marginBottom: '10px',

    '&:hover': {
      backgroundColor: '#6A98CC',
      cursor: 'pointer',
    },
  },
});

export const EditButton: VFC<PropTypes> = ({ openEditProfileDialog }) => {
  const classes = useStyles();

  return (
    <div className={classes.buttonWrapper}>
      <button className={classes.editButton} onClick={openEditProfileDialog}>
        Edytuj
      </button>
    </div>
  );
};
