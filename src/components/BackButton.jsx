import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Box my={1}>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </Box>
  );
};
export default BackButton;
