import { useState } from 'react';
import { loginService } from '../services/login';

const initialFormData = { username: '', password: '' }

const LoginForm = ({setUser}) => {
  const [formData, setFormData] = useState(initialFormData);

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login(formData)
      setUser(user)
      setFormData(initialFormData);
    } catch (error) {
      setFormData(initialFormData);
      console.log(error)
    }
  };
  return (
    <div>
      <h3>Login</h3>
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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
