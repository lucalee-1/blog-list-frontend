import { useSelector, useDispatch } from 'react-redux/';
import { handleLogout } from '../reducers/loginReducer';

const Header = () => {
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();
  return (
    <header>
      <h2>Blogs</h2>
      <p>
        Hello, {user.name}{' '}
        <button type="button" onClick={() => dispatch(handleLogout())}>
          Log Out
        </button>
      </p>
    </header>
  );
};
export default Header;
