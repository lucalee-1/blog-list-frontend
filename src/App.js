import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser } from './reducers/userReducer';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  const handleLogout = () => {
    // window.localStorage.removeItem('loggedUser');
    // setUser(null);
    // dispatch(setNotification('Successfully logged out'));
  };

  // const handleLike = async (blog) => {
  //   const blogUpdate = { likes: ++blog.likes };
  //   try {
  //     const updatedBlog = await blogService.update(blog.id, blogUpdate);
  //     setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));
  //   } catch (error) {
  //     dispatch(setNotification('Error: could not like this blog', 'red'));
  //   }
  // };

  // const handleDelete = async (blog) => {
  //   try {
  //     if (window.confirm(`Delete blog "${blog.title}"?`)) {
  //       await blogService.deleteBlog(blog.id);
  //       setBlogs(blogs.filter((b) => b.id !== blog.id));
  //       dispatch(setNotification(`Successfully deleted blog "${blog.title}"`));
  //     }
  //   } catch (error) {
  //     dispatch(setNotification('Error: could note delete this blog', 'red'));
  //   }
  // };

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    );
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>
        Hello, {user.name}{' '}
        <button type="button" onClick={handleLogout}>
          Log Out
        </button>
      </p>
      <Togglable text="Add New Blog">
        <NewBlogForm />
      </Togglable>
      <Blogs />
    </div>
  );
};

export default App;
