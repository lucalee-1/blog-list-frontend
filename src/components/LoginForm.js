import { useState } from 'react';

const initialFormData = { username: '', password: '' };

const LoginForm = ({ handleLogin }) => {
  const [formData, setFormData] = useState(initialFormData);

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleGuestAcc = async () => {
    try {
      await handleLogin({ username: 'Guest', password: 'guestpassword1' });
      setFormData(initialFormData);
    } catch (error) {
      setFormData(initialFormData);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(formData);
      setFormData(initialFormData);
    } catch (error) {
      setFormData(initialFormData);
    }
  };
  return (
    <div>
      <h3>Log In</h3>
      <div className="mb-div">
        <button type="button" onClick={handleGuestAcc}>
          Use Guest Account
        </button>
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
