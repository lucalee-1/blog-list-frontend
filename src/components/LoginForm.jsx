import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../reducers/loginReducer';
import { Box, Button, TextField, InputLabel, DialogActions } from '@mui/material';

const initialFormData = { username: '', password: '' };

const LoginForm = ({ closeDialog }) => {
  const [formData, setFormData] = useState(initialFormData);

  const { username, password } = formData;

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleGuestAcc = () => {
    dispatch(handleLogin({ username: 'Guest', password: 'guestpassword1' }));
    setFormData(initialFormData);
    closeDialog();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin(formData));
    setFormData(initialFormData);
  };
  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch' },
      }}
    >
      <Button
        type="button"
        color="secondary"
        variant="contained"
        disableElevation
        onClick={handleGuestAcc}
        sx={{ marginBottom: 2 }}
      >
        Guest Login
      </Button>
      <form onSubmit={onSubmit}>
        <div>
          <InputLabel htmlFor="username">Username</InputLabel>
          <TextField
            type="text"
            id="username"
            value={username}
            onChange={onChange}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextField
            type="password"
            id="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
          />
        </div>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button type="submit" id="loginButton">
            Log In
          </Button>
        </DialogActions>
      </form>
    </Box>
  );
};

export default LoginForm;
