import { useState } from 'react';

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

  const toggleBtn = {
    marginLeft: 3,
  }
   
  return (
    <div style={blogStyle}>
      <div style={hideDetails}>
        <span>{blog.title}</span>
        <button type="button" style= {toggleBtn} onClick={toggleDetails}>
          Show
        </button>
      </div>
      <div style={revealDetails}>
        <span>{blog.title}</span>   
        <button type="button" style= {toggleBtn} onClick={toggleDetails}>
          Hide
        </button>
        <p>By {blog.author}</p>
        <a href={blog.url}>{blog.url}</a> 
        <p>Likes: {blog.likes} <button type="button" onClick={() => handleLike(blog)}>Like</button></p>
        {/* blog.user field is populated by the backend only for get requests*/}
        {(blog.user.id === user.id || blog.user === user.id) && <button type='button' onClick={() => handleDelete(blog)}>Delete</button>}            
      </div>
    </div>
  );
};

export default BlogItem;