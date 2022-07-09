import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BlogItem from '../components/BlogItem';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import BlogActions from '../components/BlogActions';
import Comments from '../components/Comments';
import BackButton from '../components/BackButton';

const Blog = () => {
  const id = useParams().id;
  const blog = useSelector((state) => state.blogs.filter((blog) => blog.id === id).pop());
  const loggedUser = useSelector((state) => state.login);
  if (!blog) {
    return null;
  }
  return (
    <Box sx={{ width: { sm: '100%', md: '70%', lg: '60%' }, my: 5, mx: 'auto' }}>
      <BlogItem blog={blog} loggedUser={loggedUser} />
      <BlogActions blog={blog} loggedUser={loggedUser} />
      <Accordion
        defaultExpanded
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
          <Comments id={blog.id} comments={blog.comments} loggedUser={loggedUser} />
        </AccordionDetails>
      </Accordion>
      <BackButton />
    </Box>
  );
};
export default Blog;
