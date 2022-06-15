import { makeStyles } from '@mui/styles';
import { VFC } from 'react';

type PropsType = {
  page: number;
  currentPage: number;
  onChangePage: () => void;
};

type ActivePageType = {
  isActivePage: boolean;
};

const useStyles = makeStyles({
  page: ({ isActivePage }: ActivePageType) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '15px',
    width: '40px',
    height: '40px',
    backgroundColor: isActivePage ? '#5181B8' : 'transparent',
    borderRadius: isActivePage ? '100%' : 'none',
    color: isActivePage ? '#fff' : '#000',

    '&:hover': {
      color: isActivePage ? '#fff' : 'auto',
      backgroundColor: isActivePage ? '#5181B8' : '#fff',
      borderRadius: '100%',
      cursor: 'pointer',
    },
  }),
});

export const Page: VFC<PropsType> = ({ currentPage, onChangePage, page }) => {
  const classes = useStyles({ isActivePage: currentPage === page });

  return (
    <div key={page} onClick={onChangePage} className={classes.page}>
      {page}
    </div>
  );
};
