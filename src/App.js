import { useState, useEffect } from 'react';
import { blogService } from './services/blogs';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user);
      blogService.setToken(user.token)
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  if (user === null) {
    return <LoginForm setUser={setUser} />;
  }
  return (
    <div>
      <h2>Blogs</h2>
      <p>
        Hello, {user.name}{' '}
        <button type="button" onClick={handleLogout}>
          Log Out
        </button>
      </p>
      <NewBlogForm blogs={blogs} setBlogs={setBlogs}/>
      <h3>Blog List</h3>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
