import { useState } from 'react';
import { blogService } from '../services/blogs';

const initialFormData = { title: '', author: '', url: '' };

const NewBlogForm = ({ blogs, setBlogs, setNotification }) => {
  const [formData, setFormData] = useState(initialFormData);
  const { title, author, url } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdBlog = await blogService.create(formData);
      console.log(createdBlog);
      setBlogs(blogs.concat(createdBlog));
      setNotification({ text: `A new blog "${title}" by ${author} was added` });
      setFormData(initialFormData);
    } catch (error) {
      setFormData(initialFormData);
      setNotification({ text: `Error: blog could not be added`, color: 'red' });
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };
  return (
    <div>
      <h3>Add New</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" onChange={onChange} value={title} required />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" onChange={onChange} value={author} required />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input type="text" id="url" onChange={onChange} value={url} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
