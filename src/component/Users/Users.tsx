import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { User, UserSkeleton, Paginator } from './components';
import { getUsers, followThunkCreator, unfollowThunkCreator, resetUsersState } from '../../redux/reducers/user-reducer';
import { AppStoreType } from '../../redux/store';

const useStyles = makeStyles({
  users: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

export const Users = () => {
  const dispatch = useDispatch();
  const { users, isFetching, count, page, followingInProgress } = useSelector(({ users }: AppStoreType) => users);
  const classes = useStyles();

  const onChangePage = (page: number) => {
    dispatch(getUsers(count, page));
  };

  const onClickFollow = (userId: number) => {
    dispatch(followThunkCreator(userId));
  };

  const onClickUnfollow = (userId: number) => {
    dispatch(unfollowThunkCreator(userId));
  };

  useEffect(() => {
    dispatch(getUsers(count, page));
  }, [page, count, dispatch]);

  useEffect(() => {
    return function () {
      dispatch(resetUsersState());
    };
  }, [dispatch]);

  return (
    <>
      <div className={classes.users}>
        {isFetching
          ? Array(count)
              .fill(null)
              .map((el, id) => <UserSkeleton key={id} />)
          : users?.map((user) => {
              return (
                <User
                  key={user.id}
                  name={user.name}
                  id={user.id}
                  status={user.status}
                  photo={user.photos?.small}
                  followed={user.followed}
                  follow={onClickFollow}
                  unfollow={onClickUnfollow}
                  followingInProgress={followingInProgress}
                />
              );
            })}
      </div>
      <Paginator currentPage={page} onChangePage={onChangePage} />
    </>
  );
};
