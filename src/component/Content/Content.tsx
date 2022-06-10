import { makeStyles } from '@mui/styles';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Chats } from '../Chats';
import { ProfileContainer } from '../ProfileContainer';
import { Users } from '../Users';

const useStyles = makeStyles({
  content: {
    width: '100%',
    margin: '0 20px',
  },
});

export const Content = () => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Routes>
        <Route path='/profile' element={<ProfileContainer />} />
        <Route path='/profile/:userId' element={<ProfileContainer />} />
        <Route path='/' element={<Navigate to='/profile' replace />} />
        <Route path='/chats' element={<Navigate to='/chats/1' replace />} />
        <Route path='/chats/:id' element={<Chats />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </div>
  );
};
