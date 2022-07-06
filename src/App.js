import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser } from './reducers/userReducer';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Header from './components/Header';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

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
      <Notification />
      <Header />
      <Togglable text="Add New Blog">
        <NewBlogForm />
      </Togglable>
      <Blogs />
    </div>
  );
};

export default App;
