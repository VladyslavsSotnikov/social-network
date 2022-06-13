import { AddPost } from './components/AddPost';
import { Post } from './components/Post';

const posts = [
  { id: 1, author: 'Vladyslav Sotnikov', date: '01 grd 2021', text: 'Junior Web UI developer', like: 20 },
  { id: 2, author: 'Vladyslav Sotnikov', date: '25 lis 2020', text: 'Hi! How are you today?', like: 2 },
];

export const ProfilePosts = () => {
  return (
    <>
      <AddPost />
      {posts.map((post) => (
        <Post key={post.id} author={post.author} date={post.date} text={post.text} like={post.like} />
      ))}
    </>
  );
};
