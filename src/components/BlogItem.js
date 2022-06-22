import { useState } from 'react';

const BlogItem = ({ blog }) => {
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

  const buttonStyle = {
    marginLeft: 3,
  };

  return (
    <div style={blogStyle}>
      <div style={hideDetails}>
        <span>{blog.title}</span>
        <button type="button" style={buttonStyle} onClick={toggleDetails}>
          Show
        </button>
      </div>
      <div style={revealDetails}>
        <span>{blog.title}</span>
        <button type="button" style={buttonStyle} onClick={toggleDetails}>
          Hide
        </button>
        <p>By {blog.author}</p>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes}</p>
      </div>
    </div>
  );
};

export default BlogItem;
