import { VFC } from 'react';
import { makeStyles } from '@mui/styles';

import left from '../../../../../../assests/left.svg';

type PropTypes = {
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

export const LeftArrow: VFC<PropTypes> = ({ leftPortionPageNumber, handlePortionNumber }) => {
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
