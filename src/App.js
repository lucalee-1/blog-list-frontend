import { useState, useEffect } from 'react';
import { blogService } from './services/blogs';
import { loginService } from './services/login';
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
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setNotification({ text: `Welcome back, ${user.name}!` });
    } catch (error) {
      setNotification({ text: 'Invalid username or password', color: 'red' });
    }
  };

  const handleCreate = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      setNotification({ text: `A new blog "${newBlog.title}" by ${newBlog.author} was added` });
    } catch (error) {
      setNotification({ text: 'Error: blog could not be added', color: 'red' });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    setNotification({ text: 'Successfully logged out' });
  };

  const handleLike = async (blog) => {
    const blogUpdate = { likes: ++blog.likes };
    try {
      const updatedBlog = await blogService.update(blog.id, blogUpdate);
      setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));
    } catch (error) {
      setNotification({ text: 'Error: could not like this blog', color: 'red' });
    }
  };

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Delete blog "${blog.title}"?`)) {
        await blogService.deleteBlog(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        setNotification({ text: `Successfully deleted blog "${blog.title}"` });
      }
    } catch (error) {
      setNotification({ text: 'Error: could note delete this blog', color: 'red' });
    }
  };

  let sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  if (user === null) {
    return (
      <>
        <Notification notification={notification} setNotification={setNotification} />
        <LoginForm handleLogin={handleLogin} />
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
        <NewBlogForm handleCreate={handleCreate} />
      </Togglable>
      <h3>Blog List</h3>
      {sortedBlogs.map((blog) => (
        <BlogItem
          key={blog.id}
          blog={blog}
          user={user}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
