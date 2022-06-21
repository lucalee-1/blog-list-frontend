import { useState, useEffect } from 'react';
import {blogService} from './services/blogs';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  if (user === null) {
    return <LoginForm setUser={setUser} />;
  }
  return (
    <div>
      <h2>Blogs</h2>
      <p>Hello, {user.name}</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
