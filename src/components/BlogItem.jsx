import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Link as MuiLink } from '@mui/material';

const BlogItem = ({ blog, loggedUser }) => {
  console.log(loggedUser);
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" component="p" color="text.primary" gutterBottom>
            {blog.title}
          </Typography>
          <Typography sx={{ mb: 3 }} color="text.secondary">
            -{blog.author}
          </Typography>
          <MuiLink href={blog.url} variant="body2">
            {blog.url}
          </MuiLink>
          {blog.user.name ? (
            <Typography variant="subtitle2" align="right">
              Added by{' '}
              <MuiLink underline="hover" component={Link} to={`/users/${blog.user.id}`}>
                {blog.user.name}
              </MuiLink>
            </Typography>
          ) : (
            <Typography variant="subtitle2" align="right">
              Added by{' '}
              <MuiLink underline="hover" component={Link} to={`/users/${loggedUser.id}`}>
                {loggedUser.name}
              </MuiLink>
            </Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};
export default BlogItem;
