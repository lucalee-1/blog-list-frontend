import BlogCard from './BlogCard';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const Blogs = () => {
  const user = useSelector((state) => state.login);
  const blogs = useSelector((state) => state.blogs);
  let sortedBlogs = blogs?.slice().sort((a, b) => b.likes - a.likes);
  return (
    <main>
      <Typography align="center" variant="h3" component="h3" sx={{ marginTop: 5, marginBottom: 5 }}>
        All Blogs
      </Typography>
      <Box container gap={4} sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', m: 2 }}>
        {sortedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} user={user} />
        ))}
      </Box>
    </main>
  );
};
export default Blogs;
