import { makeStyles } from '@mui/styles';

import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { Dialogs, Messages } from './components';

const useStyles = makeStyles({
  chats: {
    display: 'flex',
  },
});

export const Chats = withAuthRedirect(() => {
  const classes = useStyles();

  return (
    <div className={classes.chats}>
      <Dialogs />
      <Messages />
    </div>
  );
});
