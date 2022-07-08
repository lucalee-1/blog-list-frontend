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
  styled,
} from '@mui/material';

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
      <TableContainer
        sx={{ marginTop: 5, marginBottom: 5, display: 'flex', justifyContent: 'center' }}
      >
        <Table sx={{ width: '70%' }}>
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
    </>
  );
};
export default Users;
