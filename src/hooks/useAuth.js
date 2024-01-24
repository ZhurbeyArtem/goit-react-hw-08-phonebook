import { useSelector } from 'react-redux';
import { getAuth, getLoading, getUser } from '../redux/user/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(getAuth);
  const isRefreshing = useSelector(getLoading);
  const user = useSelector(getUser);

  return {
    isLoggedIn,
    isRefreshing,
    user,
  };
};
