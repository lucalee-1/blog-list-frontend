import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeHandler, deleteHandler } from '../reducers/blogReducer';
import BlogItem from '../components/BlogItem';
import { Box, Chip, Paper, styled } from '@mui/material';
import { Favorite, Delete as DeleteIcon, ArrowCircleRight } from '@mui/icons-material';

const Blog = () => {
  const id = useParams().id;
  const blog = useSelector((state) => state.blogs.filter((blog) => blog.id === id).pop());
  const loggedUser = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const SquaredChip = styled(Chip)({ borderRadius: 8, component: 'button' });

  if (!blog) {
    return null;
  }
  return (
    <Box sx={{ width: '70%', my: 5, mx: 'auto' }}>
      <BlogItem blog={blog} user={loggedUser} />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <SquaredChip
          variant="outlined"
          color="primary"
          label="Like"
          icon={<Favorite />}
          clickable
          type="button"
          onClick={() => dispatch(likeHandler(blog))}
        />
        <SquaredChip
          color="primary"
          label="Visit"
          icon={<ArrowCircleRight />}
          clickable
          href={blog.url}
          target="_blank"
          rel="noreferrer"
        />
        {(blog.user.id === loggedUser?.id || blog.user === loggedUser?.id) && (
          <SquaredChip
            color="primary"
            label="Delete"
            icon={<DeleteIcon />}
            clickable
            onClick={() => dispatch(deleteHandler(blog))}
          />
        )}
      </Box>
    </Box>
  );
};
export default Blog;
