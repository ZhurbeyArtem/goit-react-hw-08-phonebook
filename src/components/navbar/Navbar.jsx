import { NLink, NavbarMain } from './Navbar.styled';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../redux/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogout } from '../../redux/user/api';

function Navbar() {
  const isAuth = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    await dispatch(fetchLogout());
    navigate('/login');
  };

  return (
    <>
      <NavbarMain>
        {isAuth ? (
          <>
            <p>{isAuth.user.email}</p>
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
