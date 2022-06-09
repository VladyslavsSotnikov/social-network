import { makeStyles } from '@mui/styles';
import { VFC } from 'react';

const useStyles = makeStyles({
  messages: {
    marginLeft: '40px',
  },

  messageItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },

  messagePhoto: {
    marginRight: '15px',

    '&>img': {
      width: '30px',
      height: '30px',
    },
  },

  messageContent: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '200px',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
  },

  messageTime: {
    opacity: '.22',
    marginLeft: '20px',
  },

  messageInput: {
    border: '1px solid #DDDDDD',
    padding: '10px 15px',
    borderRadius: '5px',
    minWidth: '300px',
    marginRight: '30px',
  },
});

const messages = [
  { id: 1, imgSrc: '/static/media/man.43005507.svg', message: 'Hello!', time: '17:55' },
  { id: 2, imgSrc: '/static/media/man.43005507.svg', message: 'Co słychać?', time: '17:56' },
  { id: 3, imgSrc: '/static/media/man.43005507.svg', message: 'I am junior React developer', time: '17:59' },
];

export const Messages: VFC = () => {
  const classes = useStyles();

  return (
    <div className={classes.messages}>
      <div>
        {messages.map((message) => (
          <div key={message.id} className={classes.messageItem}>
            <div className={classes.messagePhoto}>
              <img src={message.imgSrc} alt='man' />
            </div>
            <div className={classes.messageContent}>
              <p>{message.message}</p>
              <span className={classes.messageTime}>{message.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <input type='text' className={classes.messageInput} placeholder='Wpisz wiadomość ...' />
        <button type='submit' className='chats__message-btn'>
          {' '}
          Odeśij
        </button>
      </div>
    </div>
  );
};
