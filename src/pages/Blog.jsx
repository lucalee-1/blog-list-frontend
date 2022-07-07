import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

const Blog = () => {
  const id = useParams().id;
  const blog = useSelector((state) => state.blogs.filter((blog) => blog.id === id).pop());
  if (!blog) {
    return null;
  }
  return (
    <div>
      <h3>{blog.title}</h3>
    </div>
  );
};
export default Blog;
