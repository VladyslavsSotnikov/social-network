import { VFC } from 'react';
import { makeStyles } from '@mui/styles';

import right from '../../../../../../assests/right.svg';

type PropTypes = {
  portionNumber: number;
  numberOfPortion: number;
  handleRightPortionNumber: () => void;
};

const useStyles = makeStyles({
  rightArrow: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export const RightArrow: VFC<PropTypes> = ({ numberOfPortion, portionNumber, handleRightPortionNumber }) => {
  const classes = useStyles();
  if (numberOfPortion === portionNumber) {
    return null;
  }

  return (
    <div className={classes.rightArrow} onClick={handleRightPortionNumber}>
      <img src={right} alt='right' />
    </div>
  );
};
