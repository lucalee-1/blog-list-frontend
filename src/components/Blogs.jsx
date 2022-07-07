import BlogItem from './BlogItem';
import { useSelector } from 'react-redux';

const Blogs = () => {
  const user = useSelector((state) => state.login);
  const blogs = useSelector((state) => state.blogs);
  let sortedBlogs = blogs?.slice().sort((a, b) => b.likes - a.likes);
  return (
    <main>
      <h3>Blog List</h3>
      {sortedBlogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} user={user} />
      ))}
    </main>
  );
};
export default Blogs;
