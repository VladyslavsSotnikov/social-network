import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from '../../../../../../../redux/reducers';
import { AppStoreType } from '../../../../../../../redux/store';
import { AddPost } from './components/AddPost';
import { Post } from './components/Post';

export const ProfilePosts = () => {
  const { posts } = useSelector(({ profile }: AppStoreType) => profile);
  const dispatch = useDispatch();

  const onClickDelete = (id: number) => {
    dispatch(profileActions.delatePost(id));
  };
  return (
    <>
      <AddPost />
      {posts.map((post) => (
        <Post
          key={post.id}
          onClickDelete={() => onClickDelete(post.id)}
          author={post.author}
          date={post.date}
          text={post.text}
          like={post.like}
        />
      ))}
    </>
  );
};
