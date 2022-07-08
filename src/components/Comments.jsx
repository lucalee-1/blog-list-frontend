import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentHandler } from '../reducers/blogReducer';
import { TextField, IconButton, List, ListItem } from '@mui/material';
import { Send } from '@mui/icons-material';

const Comments = ({ id, comments }) => {
  const [formData, setFormData] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(commentHandler(id, formData));
    setFormData('');
  };

  const onChange = (e) => {
    setFormData(e.target.value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <TextField
          placeholder="Write a comment"
          onChange={onChange}
          value={formData}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton color="primary" type="submit">
                <Send />
              </IconButton>
            ),
          }}
        />
      </form>
      <List>
        {comments.map((comment, i) => (
          <ListItem key={i} divider>
            {comment}
          </ListItem>
        ))}
      </List>
    </>
  );
};
export default Comments;
