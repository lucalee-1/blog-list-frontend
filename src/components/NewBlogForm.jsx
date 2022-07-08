import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { Box, Button, TextField, InputLabel, DialogActions } from '@mui/material';

const initialFormData = { title: '', author: '', url: '' };

const NewBlogForm = ({ closeDialog }) => {
  const [formData, setFormData] = useState(initialFormData);
  const { title, author, url } = formData;
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createBlog(formData));
    setFormData(initialFormData);
    closeDialog();
  };

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: { xs: '30ch', sm: '50ch' } },
      }}
    >
      <form onSubmit={onSubmit}>
        <div>
          <InputLabel htmlFor="title">Title</InputLabel>
          <TextField type="text" id="title" onChange={onChange} value={title} required />
        </div>
        <div>
          <InputLabel htmlFor="author">Author</InputLabel>
          <TextField type="text" id="author" onChange={onChange} value={author} required />
        </div>
        <div>
          <InputLabel htmlFor="url">URL</InputLabel>
          <TextField type="text" id="url" onChange={onChange} value={url} required />
        </div>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Box>
  );
};

export default NewBlogForm;
