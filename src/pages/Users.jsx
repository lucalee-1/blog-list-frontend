import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
  Box,
  styled,
} from '@mui/material';
import NavButton from '../components/NavButton';

const Users = () => {
  const users = useSelector((state) => state.users?.filter((user) => user.blogs.length > 0));
  const sortedUsers = users?.slice().sort((a, b) => b.blogs.length - a.blogs.length);

  if (!users) {
    return null;
  }

  const CenteredCell = styled(TableCell)({ textAlign: 'center' });
  return (
    <>
      <Typography align="center" variant="h3" component="h3" sx={{ marginTop: 5, marginBottom: 5 }}>
        Users
      </Typography>
      <Box sx={{ my: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TableContainer
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Table sx={{ width: { sm: '100%', md: '70%', lg: '60%' } }}>
            <TableHead>
              <TableRow>
                <CenteredCell>User Name</CenteredCell>
                <CenteredCell>Blogs Added</CenteredCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers.map((user) => (
                <TableRow key={user.id}>
                  <CenteredCell>
                    <Button component={Link} to={`/users/${user.id}`}>
                      {user.name}
                    </Button>
                  </CenteredCell>
                  <CenteredCell>{user.blogs.length}</CenteredCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <NavButton />
      </Box>
    </>
  );
};
export default Users;
