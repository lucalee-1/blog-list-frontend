import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentHandler } from '../reducers/blogReducer';
import { TextField, IconButton, List, ListItem, Box, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';

const Comments = ({ id, comments, loggedUser }) => {
  const [formData, setFormData] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.trim().length < 1) {
      setFormData('');
      return;
    }
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
          label={placeholderText}
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
      <Box mt={1}>
        {comments ? (
          <List>
            {comments.map((comment, i) => (
              <ListItem key={i} divider>
                {comment}
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="subtitle2" mt={2}>
            No comments yet.
          </Typography>
        )}
      </Box>
    </>
  );
};
export default Comments;
