import { Card, CardContent, Typography, Link as MuiLink } from '@mui/material';

const BlogItem = ({ blog }) => {
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
        </CardContent>
      </Card>
    </>
  );
};
export default BlogItem;
