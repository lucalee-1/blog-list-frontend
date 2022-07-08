import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemButton, Box } from '@mui/material';
import BackButton from '../components/BackButton';

const User = () => {
  const id = useParams().id;
  const user = useSelector((state) => state.users?.filter((user) => user.id === id).pop());
  if (!user) {
    return null;
  }
  return (
    <>
      <Typography align="center" variant="h3" component="h3" sx={{ marginTop: 5, marginBottom: 5 }}>
        {user.name}
      </Typography>
      <Box sx={{ marginBottom: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" component="p" sx={{ marginLeft: 4 }}>
          Added Blogs
        </Typography>
        <List>
          {user.blogs.map((blog) => (
            <ListItem key={blog.id} divider>
              <ListItemButton component={Link} to={`/blogs/${blog.id}`} sx={{ color: '#6E85B7' }}>
                {blog.title}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <BackButton />
      </Box>
    </>
  );
};
export default User;
