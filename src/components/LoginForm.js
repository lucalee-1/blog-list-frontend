import { useState } from 'react';
import { loginService } from '../services/login';
import { blogService } from '../services/blogs';

const initialFormData = { username: '', password: '' };

const LoginForm = ({ setUser, setNotification }) => {
  const [formData, setFormData] = useState(initialFormData);

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login(formData);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setNotification({ text: `Welcome back, ${user.name}!` });
      setFormData(initialFormData);
    } catch (error) {
      setNotification({ text: 'Invalid username or password', color: 'red' });
      setFormData(initialFormData);
    }
  };
  return (
    <div>
      <h3>Log In</h3>
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
        <button type="submit" id='loginButton'>Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
