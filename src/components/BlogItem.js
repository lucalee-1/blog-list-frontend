import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogItem = ({ blog, user, handleLike, handleDelete }) => {
  const [showDetails, setshowDetails] = useState(false);

  const hideDetails = { display: showDetails ? 'none' : '' };
  const revealDetails = { display: showDetails ? '' : 'none' };

  const toggleDetails = () => {
    setshowDetails(!showDetails);
  };

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
    <div style={blogStyle}>
      <div style={hideDetails} className="noDetailsDiv">
        <span>{blog.title} </span>
        <span>
          -<i>{blog.author}</i>
        </span>
        <button type="button" id="showBtn" style={itemBtn} onClick={toggleDetails}>
          Show
        </button>
      </div>
      <div style={revealDetails} className="detailsDiv">
        <span>{blog.title}</span>
        <button type="button" id="hideBtn" style={itemBtn} onClick={toggleDetails}>
          Hide
        </button>
        <p>By {blog.author}</p>
        <a href={blog.url}>{blog.url}</a>
        <p>
          Likes: {blog.likes}
          <button type="button" id="likeBtn" style={itemBtn} onClick={() => handleLike(blog)}>
            Like
          </button>
        </p>
        {/* blog.user field is only populated by the backend for get requests*/}
        {(blog.user.id === user.id || blog.user === user.id) && (
          <button type="button" id="deleteBtn" onClick={() => handleDelete(blog)}>
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
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default BlogItem;
