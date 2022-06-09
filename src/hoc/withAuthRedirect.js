import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const withAuthRedirect = (Component) => {
  const ConteinerComponent = (props) => {
    const { isAuth } = useSelector(({ auth }) => auth);

    if (!isAuth) {
      return <Navigate to='/login' />;
    }

    return <Component {...props} />;
  };

  return ConteinerComponent;
};
