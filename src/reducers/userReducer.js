import { createSlice } from '@reduxjs/toolkit';
import { userService } from '../services/users';

const userSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    updateUserBlogs(state, action) {
      const userId = action.payload.user.id;
      state.find((u) => u.id === userId).blogs.push(action.payload);
    },
    deleteUserBlogs(state, action) {
      const userId = action.payload.user.id;
      const updatedUser = state.find((u) => u.id === userId);
      updatedUser.blogs.splice(
        updatedUser.blogs.findIndex((blog) => blog.id === action.payload.id),
        1
      );
    },
  },
});

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export const { setUsers, updateUserBlogs, deleteUserBlogs } = userSlice.actions;
export default userSlice.reducer;
