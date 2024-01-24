import { NLink, NavbarMain } from './Navbar.styled';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchLogout } from '../../redux/user/api';
import { useAuth } from 'hooks';

function Navbar() {
  const { isLoggedIn, user } = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    await dispatch(fetchLogout());
    navigate('/login');
  };

  return (
    <>
      <NavbarMain>
        {isLoggedIn ? (
          <>
            <p>{user.email}</p>
            <NLink onClick={logout}>LogOut</NLink>
          </>
        ) : (
          <>
            <NLink to="/login">Login</NLink>
            <NLink to="/register">Register</NLink>
          </>
        )}
      </NavbarMain>
    </>
  );
}
export default Navbar;
