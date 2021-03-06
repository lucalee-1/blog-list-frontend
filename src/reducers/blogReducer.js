import { createSlice } from '@reduxjs/toolkit';
import { blogService } from '../services/blogs';
import { setNotification } from './notificationReducer';
import { deleteUserBlogs, updateUserBlogs } from './userReducer';

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
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog));
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (error) {
      dispatch(setNotification('Error: failed to fetch blogs', 'red'));
    }
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(blog);
      dispatch(appendBlog(createdBlog));
      dispatch(updateUserBlogs(createdBlog));
      dispatch(setNotification(`A new blog "${blog.title}" by ${blog.author} was added`));
    } catch (error) {
      dispatch(setNotification('Error: failed to add new blog', 'error'));
    }
  };
};

export const likeHandler = (blog) => {
  return async (dispatch) => {
    const blogUpdate = { likes: blog.likes + 1 };
    try {
      const updatedBlog = await blogService.update(blog.id, blogUpdate);
      dispatch(updateBlog(updatedBlog));
    } catch (error) {
      dispatch(setNotification('Error: failed to like blog', 'error'));
    }
  };
};

export const commentHandler = (id, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.comment(id, { comment });
      dispatch(updateBlog(updatedBlog));
    } catch (error) {
      dispatch(setNotification('Error: failed to add comment', 'error'));
    }
  };
};

export const deleteHandler = (blog) => {
  return async (dispatch) => {
    if (window.confirm(`Delete blog "${blog.title}"?`)) {
      try {
        await blogService.deleteBlog(blog.id);
        dispatch(deleteBlog(blog.id));
        dispatch(deleteUserBlogs(blog));
        dispatch(setNotification(`Successfully deleted blog "${blog.title}"`));
      } catch (error) {
        dispatch(setNotification(`Error: failed to delete blog "${blog.title}"`, 'error'));
      }
    }
  };
};

export const { setBlogs, appendBlog, updateBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
