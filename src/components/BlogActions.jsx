import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { likeHandler, deleteHandler } from '../reducers/blogReducer';
import { Box, Chip, Badge, styled } from '@mui/material';
import { Favorite, Delete as DeleteIcon, ArrowCircleRight } from '@mui/icons-material';

const BlogActions = ({ blog, loggedUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SquaredChip = styled(Chip)({
    borderRadius: 8,
    borderColor: '#e0e0e0',
  });

  const handleDelete = (blog) => {
    dispatch(deleteHandler(blog));
    navigate('/');
  };

  return (
    <Box mt={1} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <SquaredChip
        variant="outlined"
        color="primary"
        label="Like"
        icon={
          <Badge color="secondary" badgeContent={blog.likes}>
            <Favorite />
          </Badge>
        }
        clickable
        onClick={() => dispatch(likeHandler(blog))}
      />
      <SquaredChip
        color="primary"
        label="Visit"
        component="button"
        icon={<ArrowCircleRight />}
        clickable
        href={blog.url}
        target="_blank"
        rel="noreferrer"
      />
      {(blog.user.id === loggedUser?.id || blog.user === loggedUser?.id) && (
        <SquaredChip
          variant="outlined"
          color="warning"
          label="Delete"
          icon={<DeleteIcon />}
          clickable
          onClick={() => handleDelete(blog)}
        />
      )}
    </Box>
  );
};
export default BlogActions;
