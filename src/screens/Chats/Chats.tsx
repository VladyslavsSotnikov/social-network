import { makeStyles } from '@mui/styles';

import { Dialogs, Messages } from './components';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

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
