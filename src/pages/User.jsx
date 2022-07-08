import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemButton, Box, Link as MuiLink } from '@mui/material';

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
            <ListItem key={blog.id}>
              <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
                {blog.title}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};
export default User;
