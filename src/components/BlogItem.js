import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogItem = ({ blog, user }) => {
  const [showDetails, setshowDetails] = useState(false);

  const hideDetails = { display: showDetails ? 'none' : '' };
  const revealDetails = { display: showDetails ? '' : 'none' };

  const toggleDetails = () => {
    setshowDetails(!showDetails);
  };

  const handleLike = () => {};
  const handleDelete = () => {};

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
      <div style={hideDetails} className="noDetailsDiv">
        <span>{blog.title} </span>
        <span>
          -<i>{blog.author}</i>
        </span>
        <button type="button" className="showBtn" style={itemBtn} onClick={toggleDetails}>
          Show
        </button>
      </div>
      <div style={revealDetails} className="detailsDiv">
        <span>{blog.title}</span>
        <button type="button" className="hideBtn" style={itemBtn} onClick={toggleDetails}>
          Hide
        </button>
        <p>By {blog.author}</p>
        <a href={blog.url}>{blog.url}</a>
        <p>
          Likes: {blog.likes}
          <button
            type="button"
            className="likeBtn"
            style={itemBtn}
            onClick={() => handleLike(blog)}
          >
            Like
          </button>
        </p>
        {/* blog.user field is only populated by the backend for get requests*/}
        {(blog.user.id === user.id || blog.user === user.id) && (
          <button type="button" className="deleteBtn" onClick={() => handleDelete(blog)}>
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
