import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentHandler } from '../reducers/blogReducer';
import { TextField, IconButton, List, ListItem } from '@mui/material';
import { Send } from '@mui/icons-material';

const Comments = ({ id, comments, loggedUser }) => {
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

  const placeholderText = loggedUser ? 'Write a comment' : 'Log In to comment';

  return (
    <>
      <form onSubmit={onSubmit}>
        <TextField
          placeholder={placeholderText}
          onChange={onChange}
          value={formData}
          disabled={Boolean(!loggedUser)}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton color="primary" type="submit" disabled={Boolean(!loggedUser)}>
                <Send />
              </IconButton>
            ),
          }}
        />
      </form>
      {comments && (
        <List>
          {comments.map((comment, i) => (
            <ListItem key={i} divider>
              {comment}
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};
export default Comments;
