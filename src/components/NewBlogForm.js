import { useState } from 'react';

const initialFormData = { title: '', author: '', url: '' };

const NewBlogForm = ({ handleCreate }) => {
  const [formData, setFormData] = useState(initialFormData);
  const { title, author, url } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleCreate(formData);
      setFormData(initialFormData);
    } catch (error) {
      setFormData(initialFormData);
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
