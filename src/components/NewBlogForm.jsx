import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';

const initialFormData = { title: '', author: '', url: '' };

const NewBlogForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { title, author, url } = formData;
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createBlog(formData));
    setFormData(initialFormData);
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
