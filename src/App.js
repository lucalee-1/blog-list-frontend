import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeLogin } from './reducers/loginReducer';
import { initializeUsers } from './reducers/userReducer';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Header from './components/Header';
import Users from './pages/Users';
import BlogList from './pages/BlogList';
import User from './pages/User';

const App = () => {
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(initializeLogin());
  }, []);

  useEffect(() => {
    dispatch(initializeUsers());
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
    <>
      <Notification />
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
