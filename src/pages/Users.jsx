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
  console.log(users);
  return (
    <>
      <h3>Users</h3>
      <div></div>
    </>
  );
};
export default Users;
