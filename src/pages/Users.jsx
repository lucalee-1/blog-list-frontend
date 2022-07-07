import { userService } from '../services/users';
import { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userService.getAll();
      setUsers(users);
    };
    fetchUsers();
  }, []);
  return (
    <>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs added</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td> {user.blogs.length} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Users;
