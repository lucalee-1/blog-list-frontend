import { useDispatch } from 'react-redux';
import { likeHandler, deleteHandler } from '../reducers/blogReducer';
import PropTypes from 'prop-types';
import {
  Badge,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BlogItem = ({ blog, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
  };

  const itemBtn = {
    marginLeft: 3,
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <CardActionArea onClick={() => navigate(`/blogs/${blog.id}`)}>
          <CardContent sx={{ p: 2.5 }}>
            <Typography variant="h6" component="p" color="text.primary" gutterBottom noWrap>
              {blog.title}</Typography>
            <Typography sx={{ mb: 4 }} color="text.secondary">
              -{blog.author}
            </Typography>
            <Typography variant="body2" noWrap>
              {blog.url}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Badge color="secondary" badgeContent={blog.likes} overlap="circular">
            <Button type="button" style={itemBtn} onClick={() => dispatch(likeHandler(blog))}>
              Like
            </Button>
          </Badge>
          {(blog.user.id === user?.id || blog.user === user?.id) && (
            <Button type="button" onClick={() => dispatch(deleteHandler(blog))}>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default BlogItem;
