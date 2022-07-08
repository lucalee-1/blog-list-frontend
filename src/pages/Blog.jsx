import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeHandler, deleteHandler } from '../reducers/blogReducer';
import BlogItem from '../components/BlogItem';
import {
  Box,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  styled,
} from '@mui/material';
import {
  Favorite,
  Delete as DeleteIcon,
  ArrowCircleRight,
  ExpandMore,
} from '@mui/icons-material';
import Comments from '../components/Comments';

const Blog = () => {
  const id = useParams().id;
  const blog = useSelector((state) => state.blogs.filter((blog) => blog.id === id).pop());
  const loggedUser = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const SquaredChip = styled(Chip)({
    borderRadius: 8,
    component: 'button',
    borderColor: '#e0e0e0',
  });

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
            variant="outlined"
            color="primary"
            label="Delete"
            icon={<DeleteIcon />}
            clickable
            onClick={() => dispatch(deleteHandler(blog))}
          />
        )}
      </Box>
      <Accordion
        sx={{
          '.MuiPaper-root': {
            border: 'none',
            boxShadow: 'none',
            backgroundColor: 'blue',
          },
          boxShadow: 'none',
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: '#e0e0e0',
          borderRadius: '8px',
          '&:before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Comments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Comments id={blog.id} comments={blog.comments} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
export default Blog;
