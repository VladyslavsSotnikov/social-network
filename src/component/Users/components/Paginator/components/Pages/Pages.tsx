import { makeStyles } from '@mui/styles';
import { VFC } from 'react';
import { Page } from './components';

type PropsType = {
  pages: number[];
  currentPage: number;
  leftPortionPageNumber: number;
  rightPortionPageNumber: number;
  onChangePage: (page: number) => void;
};

const useStyles = makeStyles({
  pages: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0px 20px',
  },
});

export const Pages: VFC<PropsType> = ({
  pages,
  leftPortionPageNumber,
  rightPortionPageNumber,
  onChangePage,
  currentPage,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.pages}>
      {pages
        .filter((page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
        .map((page) => {
          return <Page key={page} onChangePage={() => onChangePage(page)} currentPage={currentPage} page={page} />;
        })}
    </div>
  );
};
