import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import BlogItem from '../components/BlogItem';

const Blog = () => {
  const id = useParams().id;
  const blog = useSelector((state) => state.blogs.filter((blog) => blog.id === id).pop());
  const loggedUser = useSelector((state) => state.login);

  if (!blog) {
    return null;
  }
  return (
    <div>
      <h3>{blog.title}</h3>
      <BlogItem blog={blog} user={loggedUser} />
    </div>
  );
};
export default Blog;
