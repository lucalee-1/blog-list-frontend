import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeLogin } from './reducers/loginReducer';
import { initializeUsers } from './reducers/userReducer';
import NavBar from './components/Navbar';
import Notification from './components/Notification';
import Users from './pages/Users';
import BlogList from './pages/BlogList';
import User from './pages/User';
import Blog from './pages/Blog';
import { Container, Box } from '@mui/system';

const App = () => {
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

  return (
    <>
      <Router>
        <NavBar />
        <Notification />
        <Container>
          <Box minHeight="100vh">
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blogs/:id" element={<Blog />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </>
  );
};

export default App;
