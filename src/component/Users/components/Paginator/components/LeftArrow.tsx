import { makeStyles } from '@mui/styles';
import { VFC } from 'react';
import left from '../../../../../assests/left.svg';

type PropsType = {
  leftPortionPageNumber: number;
  handlePortionNumber: () => void;
};

const useStyles = makeStyles({
  leftArrow: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export const LeftArrow: VFC<PropsType> = ({ leftPortionPageNumber, handlePortionNumber }) => {
  const classes = useStyles();

  if (leftPortionPageNumber <= 1) {
    return null;
  }

  return (
    <div className={classes.leftArrow} onClick={handlePortionNumber}>
      <img src={left} alt='left' />
    </div>
  );
};
