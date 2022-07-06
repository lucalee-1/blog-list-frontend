import { createSlice } from '@reduxjs/toolkit';
import { blogService } from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    likeBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog));
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};
export const createBlog = (blog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(blog);
    dispatch(appendBlog(createdBlog));
  };
};

export const handleLike = (blog) => {
  return async (dispatch) => {
    const blogUpdate = { likes: blog.likes + 1 };
    const updatedBlog = await blogService.update(blog.id, blogUpdate);
    dispatch(likeBlog(updatedBlog));
  };
};

export const { setBlogs, appendBlog, likeBlog } = blogSlice.actions;
export default blogSlice.reducer;
