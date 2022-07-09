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
      const id = action.payload.id;
      console.log(id);
      // const updatedUser = state.filter((u) => u.id === id);
      // console.log(updatedUser);
      // updatedUser.blogs.push(action.payload.blog);
      // return state.map((user) => (user.id !== id ? user : updatedUser));
    },
  },
});

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export const { setUsers, updateUserBlogs } = userSlice.actions;
export default userSlice.reducer;
