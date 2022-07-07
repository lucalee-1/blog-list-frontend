import { useDispatch } from 'react-redux';
import { likeHandler, deleteHandler } from '../reducers/blogReducer';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Badge,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Tooltip,
} from '@mui/material';
import { Favorite, Delete as DeleteIcon } from '@mui/icons-material';

const BlogItem = ({ blog, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
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
              {blog.title}
            </Typography>
            <Typography sx={{ mb: 4 }} color="text.secondary">
              -{blog.author}
            </Typography>
            <Typography variant="body2" noWrap>
              {blog.url}
            </Typography>
          </CardContent>
        </CardActionArea>
        {user ? (
          <CardActions>
            <Tooltip title="Like">
              <Button type="button" onClick={() => dispatch(likeHandler(blog))}>
                <Badge color="secondary" badgeContent={blog.likes}>
                  <Favorite />
                </Badge>
              </Button>
            </Tooltip>
            {(blog.user.id === user?.id || blog.user === user?.id) && (
              <Tooltip title="Delete">
                <Button type="button" onClick={() => dispatch(deleteHandler(blog))}>
                  <DeleteIcon />
                </Button>
              </Tooltip>
            )}
          </CardActions>
        ) : (
          <CardActions>
            <Tooltip title="Log In to like">
              <Button type="button">
                <Favorite />
              </Button>
            </Tooltip>
          </CardActions>
        )}
      </Card>
    </>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default BlogItem;
