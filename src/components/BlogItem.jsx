import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likeHandler, deleteHandler } from '../reducers/blogReducer';
import PropTypes from 'prop-types';

const BlogItem = ({ blog, user }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const itemBtn = {
    marginLeft: 3,
  };

  return (
    <div style={blogStyle} className="blogItem">
      <div>
        <span>{blog.title}</span>
        <p>By {blog.author}</p>
        <a href={blog.url}>{blog.url}</a>
        <p>
          Likes: {blog.likes}
          <button
            type="button"
            className="likeBtn"
            style={itemBtn}
            onClick={() => dispatch(likeHandler(blog))}
          >
            Like
          </button>
        </p>
        {/* blog.user field is only populated by the backend for get requests*/}
        {(blog.user.id === user.id || blog.user === user.id) && (
          <button type="button" className="deleteBtn" onClick={() => dispatch(deleteHandler(blog))}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default BlogItem;
