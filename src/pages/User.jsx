import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const id = useParams().id;
  const user = useSelector((state) => state.users.filter((user) => user.id === id));
  if (!user) {
    return null;
  }
  return (
    <div>
      <h3>{user[0].name}</h3>
      <h4>Added Blogs</h4>
      {user[0].blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  );
};
export default User;