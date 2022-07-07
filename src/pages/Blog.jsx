import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BlogItem from '../components/BlogItem';
import { Box } from '@mui/material';

const Blog = () => {
  const id = useParams().id;
  const blog = useSelector((state) => state.blogs.filter((blog) => blog.id === id).pop());
  const loggedUser = useSelector((state) => state.login);

  if (!blog) {
    return null;
  }
  return (
    <Box sx={{ marginTop: 5, marginBottom: 5 }}>
      <BlogItem blog={blog} user={loggedUser} />
    </Box>
  );
};
export default Blog;
