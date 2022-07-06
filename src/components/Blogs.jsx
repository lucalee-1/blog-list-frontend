import BlogItem from './BlogItem';
import { useSelector } from 'react-redux';

const Blogs = () => {
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  let sortedBlogs = blogs?.slice().sort((a, b) => b.likes - a.likes);
  return (
    <>
      <h3>Blog List</h3>
      {sortedBlogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} user={user} />
      ))}
    </>
  );
};
export default Blogs;
