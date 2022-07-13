import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const NavButton = ({ to = -1, text = 'Go Back', variant = 'text' }) => {
  const navigate = useNavigate();
  return (
    <Box my={1}>
      <Button variant={variant} onClick={() => navigate(to)}>
        {text}
      </Button>
    </Box>
  );
};
export default NavButton;
