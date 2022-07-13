import { Card, CardContent, Typography, Link as MuiLink, Box, CardActions } from '@mui/material';
import NavButton from './NavButton';

const NotFound = ({ resource }) => {
  return (
    <Box sx={{ width: { sm: '100%', md: '70%', lg: '60%' }, my: 5, mx: 'auto' }}>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h5" component="p" color="text.primary" gutterBottom>
            {resource} Not Found
          </Typography>
        </CardContent>
        <CardActions>
          <NavButton></NavButton> <NavButton to="/" text="Home"></NavButton>
        </CardActions>
      </Card>
    </Box>
  );
};
export default NotFound;
