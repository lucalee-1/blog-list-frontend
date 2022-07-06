import { createSlice } from '@reduxjs/toolkit';
import { setNotification } from './notificationReducer';
import { blogService } from '../services/blogs';
import { loginService } from '../services/login';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    deleteUser() {
      return null;
    },
  },
});

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const handleLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setNotification(`Welcome back, ${user.name}!`));
    } catch (error) {
      dispatch(setNotification('Invalid username or password', 'red'));
    }
  };
};

export const handleLogout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    dispatch(setNotification('Successfully logged out'));
  };
};

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
