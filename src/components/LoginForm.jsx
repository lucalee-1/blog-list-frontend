import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../reducers/loginReducer';

const initialFormData = { username: '', password: '' };

const LoginForm = () => {
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
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin(formData));
    setFormData(initialFormData);
  };
  return (
    <div>
      <h3>Log In</h3>
      <div className="mb-div">
        <p>
          <button type="button" onClick={handleGuestAcc}>
            Guest Login
          </button>
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={onChange}
            placeholder="Username"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
          />
        </div>
        <button type="submit" id="loginButton">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
