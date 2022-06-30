import { useEffect, useState, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { AppStoreType } from '../../../../../../../../../redux/store';
import { updateStatus } from '../../../../../../../../../redux/reducers';

type PropTypes = {
  isAuthorizedUser: boolean;
};

const useStyles = makeStyles({
  status: ({ isAuthorizedUser }: { isAuthorizedUser: boolean }) => ({
    display: 'block',
    width: '100%',
    padding: '7px 0',
    maxWidth: '685px',
    overflow: 'hidden',

    '&:hover': {
      backgroundColor: isAuthorizedUser ? '#D5D5D6' : 'transparent',
      cursor: isAuthorizedUser ? 'pointer' : 'context-menu',
    },
  }),

  statusInput: {
    width: '100%',
    border: '1px solid #DDDDDD',
    marginBottom: '8px',
    padding: '5px 10px',
    borderRadius: '2px',
  },
});

export const Status: VFC<PropTypes> = ({ isAuthorizedUser }) => {
  const { status, profile } = useSelector(({ profile }: AppStoreType) => profile);
  const dispatch = useDispatch();
  const [localStatus, setLocalStatus] = useState(status);
  const [editMode, setEditMode] = useState(false);
  const classes = useStyles({ isAuthorizedUser });

  const onBlurStatus = () => {
    setEditMode(false);
    if (profile?.userId) {
      dispatch(updateStatus(localStatus, profile.userId));
    }
  };

  useEffect(() => {
    setLocalStatus(status);
  }, [status]);

  if (!isAuthorizedUser) {
    return <span className={classes.status}>{status ? status : 'Ja jeszcze nie mam statusu :('}</span>;
  }

  if (!editMode) {
    return (
      <span className={classes.status} onClick={() => setEditMode(true)}>
        {status ? status : null}
      </span>
    );
  }

  return (
    <input
      autoFocus={true}
      onBlur={onBlurStatus}
      className={classes.statusInput}
      type='text'
      placeholder={status}
      value={localStatus}
      onChange={(e) => setLocalStatus(e.target.value)}
    />
  );
};
