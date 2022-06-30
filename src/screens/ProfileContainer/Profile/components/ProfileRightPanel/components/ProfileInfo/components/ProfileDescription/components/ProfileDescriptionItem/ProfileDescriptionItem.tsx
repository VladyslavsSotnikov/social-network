import { VFC } from 'react';
import { makeStyles } from '@mui/styles';

type PropTypes = {
  title: string;
  item: boolean | string;
  itemTrue: string;
  itemFalse: string;
};

const useStyles = makeStyles({
  aboutItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },

  aboutItemKey: {
    width: '100px',
    color: '#D5D5D6',
  },

  aboutItemValue: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '300px',
    color: '#4A76A8',
    textAlign: 'right',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export const ProfileDescriptionItem: VFC<PropTypes> = ({ title, item, itemFalse, itemTrue }) => {
  const classes = useStyles();
  return (
    <li className={classes.aboutItem}>
      <p className={classes.aboutItemKey}>{title}:</p>
      <span className={classes.aboutItemValue}>{item ? itemTrue : itemFalse}</span>
    </li>
  );
};
