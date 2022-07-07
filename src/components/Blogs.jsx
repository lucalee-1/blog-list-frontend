import BlogItem from './BlogItem';
import { useSelector } from 'react-redux';
import { Box, padding } from '@mui/system';

const Blogs = () => {
  const user = useSelector((state) => state.login);
  const blogs = useSelector((state) => state.blogs);
  let sortedBlogs = blogs?.slice().sort((a, b) => b.likes - a.likes);
  return (
    <main>
      <h3>Blog List</h3>
      <Box container gap={4} sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {sortedBlogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} user={user} />
        ))}
      </Box>
    </main>
  );
};
export default Blogs;
