import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { VFC } from 'react';

import likeImg from '../../../../../../../../../assests/like.svg';
import man from '../../../../../../../../../assests/man.svg';

type PostProps = {
  author: string;
  date: string;
  text: string;
  like: number;
  onClickDelete: () => void;
};

const useStyles = makeStyles({
  post: {
    backgroundColor: '#fff',
    marginTop: '10px',
    borderRadius: '5px',
    padding: '5px 10px',
  },

  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  postInfo: {
    display: 'flex',
    alignItems: 'center',
  },

  postImg: {
    width: '25px',
    height: '25px',
    marginRight: '15px',
  },

  shortInfo: {
    fontSize: '10px',
  },

  postAuthor: {
    fontWeight: 'bold',
    color: '#2A5885',
  },

  postDate: {
    color: '#D5D5D6',
  },

  postContent: {
    marginTop: '10px',
  },

  postText: {
    fontSize: '12px',
  },

  likeWrapper: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    marginTop: '10px',
    paddingTop: '8px',
    borderTop: '1px solid #D5D5D6',
  },

  like: {
    marginRight: '10px',
  },

  likeCount: {
    color: '#FF5C5C',
    fontWeight: 'bold',
  },
});

export const Post: VFC<PostProps> = ({ author, date, text, like, onClickDelete }) => {
  const classes = useStyles();

  return (
    <div className={classes.post}>
      <div className={classes.postHeader}>
        <div className={classes.postInfo}>
          <img className={classes.postImg} src={man} alt='post-img' />
          <div className={classes.shortInfo}>
            <div className={classes.postAuthor}>{author}</div>
            <div className={classes.postDate}>{date}</div>
          </div>
        </div>
        <IconButton aria-label='delete' size='small' onClick={onClickDelete}>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </div>

      <div className={classes.postContent}>
        <div className={classes.postText}>{text}</div>
        <div className={classes.likeWrapper}>
          <img className={classes.like} src={likeImg} alt='like' />
          <span className={classes.likeCount}>{like}</span>
        </div>
      </div>
    </div>
  );
};
