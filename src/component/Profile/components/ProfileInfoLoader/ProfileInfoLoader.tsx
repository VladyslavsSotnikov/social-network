import { makeStyles } from '@mui/styles';
import { VFC } from 'react';
import ContentLoader from 'react-content-loader';

type ProfileInfoLoaderProps = {
  height: number;
};

const useStyles = makeStyles({
  loader: {
    width: '100%',
    marginBottom: '7px',
  },

  rect: {
    width: '100%',
  },
});

export const ProfileInfoLoader: VFC<ProfileInfoLoaderProps> = ({ height }) => {
  const classes = useStyles();

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
