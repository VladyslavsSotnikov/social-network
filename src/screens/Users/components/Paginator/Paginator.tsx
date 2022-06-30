import { useState, VFC } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { AppStoreType } from '../../../../redux/store';
import { LeftArrow, Pages, RightArrow } from './components';

type PropTypes = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

const useStyles = makeStyles({
  paginator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px',
  },

  pages: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0px 20px',
  },

  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '15px',
    width: '40px',
    height: '40px',

    '&:hover': {
      backgroundColor: '#fff',
      borderRadius: '100%',
      cursor: 'pointer',
    },
  },

  activePage: {
    color: '#fff',
    backgroundColor: '#5181B8',
    borderRadius: '100%',

    '&:hover': {
      color: '#fff',
      backgroundColor: '#5181B8',
      borderRadius: '100%',
    },
  },
});

export const Paginator: VFC<PropTypes> = ({ currentPage, onChangePage }) => {
  const { pages, totalPage } = useSelector(({ users }: AppStoreType) => users);
  const classes = useStyles();

  const portionSize = 5;
  const [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage / portionSize));
  const numberOfPortion = Math.ceil(totalPage / portionSize);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  const handleLeftPortionNumber = () => setPortionNumber((prevState) => prevState - 1);
  const handleRightPortionNumber = () => setPortionNumber((prevState) => prevState + 1);

  return (
    <div className={classes.paginator}>
      <LeftArrow leftPortionPageNumber={leftPortionPageNumber} handlePortionNumber={handleLeftPortionNumber} />
      <Pages
        currentPage={currentPage}
        leftPortionPageNumber={leftPortionPageNumber}
        onChangePage={onChangePage}
        pages={pages}
        rightPortionPageNumber={rightPortionPageNumber}
      />
      <RightArrow
        numberOfPortion={numberOfPortion}
        portionNumber={portionNumber}
        handleRightPortionNumber={handleRightPortionNumber}
      />
    </div>
  );
};
