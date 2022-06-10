import { VFC } from 'react';
import ContentLoader from 'react-content-loader';

export const ProfilePhotoLoader: VFC = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={230}
      height={264}
      viewBox='0 0 230 264'
      backgroundColor='#dbdbdb'
      foregroundColor='#998f8f'
      {...props}
    >
      <rect x='0' y='0' rx='5' ry='5' width='230' height='261' />
    </ContentLoader>
  );
};
