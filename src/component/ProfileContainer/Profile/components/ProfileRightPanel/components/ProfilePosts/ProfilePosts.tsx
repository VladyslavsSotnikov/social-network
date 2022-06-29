import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from '../../../../../../../redux/reducers';
import { AppStoreType } from '../../../../../../../redux/store';
import { AddPost } from './components/AddPost';
import { Post } from './components/Post';

export const ProfilePosts = () => {
  const { posts } = useSelector(({ profile }: AppStoreType) => profile);
  const dispatch = useDispatch();

  const onClickDelete = useCallback(
    (id: number) => {
      dispatch(profileActions.delatePost(id));
    },
    [dispatch]
  );
  return (
    <>
      <AddPost />
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          onClickDelete={onClickDelete}
          author={post.author}
          date={post.date}
          text={post.text}
          like={post.like}
        />
      ))}
    </>
  );
};
