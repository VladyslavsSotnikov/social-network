import { makeStyles } from '@mui/styles';
import ContentLoader from 'react-content-loader';
import { useSelector } from 'react-redux';
import { AppStoreType } from '../../../../../../../redux/store';

const useStyles = makeStyles({
  loader: {
    width: '100%',
    marginBottom: '7px',
  },

  rect: {
    width: '100%',
  },
});

const AUTHORIZED_USER_INFO_HEIGHT = 533;
const NOT_AUTHORIZED_USER_INFO_HEIGHT = 491;

export const ProfileInfoLoader = () => {
  const { isAuthorizedUser } = useSelector(({ profile }: AppStoreType) => profile);
  const classes = useStyles();

  const height = isAuthorizedUser ? AUTHORIZED_USER_INFO_HEIGHT : NOT_AUTHORIZED_USER_INFO_HEIGHT;

  return (
    <ContentLoader
      className={classes.loader}
      speed={2}
      height={height}
      viewBox={`0 0 auto ${height}`}
      backgroundColor='#dbdbdb'
      foregroundColor='#998f8f'
    >
      <rect x='0' y='0' rx='5' ry='5' height={height} className={classes.rect} />
    </ContentLoader>
  );
};
