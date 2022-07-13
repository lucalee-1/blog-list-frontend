import { createSlice } from '@reduxjs/toolkit';
import { setLocalNotification, setNotification } from './notificationReducer';
import { blogService } from '../services/blogs';
import { loginService } from '../services/login';

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload;
    },
    deleteLoggedUser() {
      return null;
    },
  },
});

export const initializeLogin = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      if (new Date().getTime() < user.tokenExpiry) {
        return dispatch(handleLogout);
      }
      dispatch(setLoggedUser(user));
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
      dispatch(setLoggedUser(user));
      dispatch(setNotification(`Welcome back, ${user.name}!`));
    } catch (error) {
      dispatch(setLocalNotification('Invalid username or password', 'error'));
    }
  };
};

export const handleLogout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedUser');
    dispatch(deleteLoggedUser());
    dispatch(setNotification('Successfully logged out'));
  };
};

export const { setLoggedUser, deleteLoggedUser } = loginSlice.actions;
export default loginSlice.reducer;
