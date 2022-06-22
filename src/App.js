import { useState, useEffect } from 'react';
import { blogService } from './services/blogs';
import BlogItem from './components/BlogItem';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    setNotification({ text: 'Successfully logged out' });
  };

  if (user === null) {
    return (
      <>
        <Notification notification={notification} setNotification={setNotification} />
        <LoginForm setUser={setUser} setNotification={setNotification} />
      </>
    );
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} setNotification={setNotification} />
      <p>
        Hello, {user.name}{' '}
        <button type="button" onClick={handleLogout}>
          Log Out
        </button>
      </p>
      <Togglable text="Add New Blog">
      <NewBlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} />
      </Togglable>
      <h3>Blog List</h3>
      {blogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
