import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useAuth } from '../hooks/useAuth';
import { fetchCurrentUser } from '../redux/user/api';
import { Layout } from './Layout';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';

import {Auth} from '../pages/Auth'
import {Contacts} from '../pages/Contacts/Contacts'

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/goit-react-hw-08-phonebook" element={<Layout />}>
        <Route
          path="/register"
          element={<RestrictedRoute redirectTo="/login" component={<Auth />} />}
        />
        <Route
          path="/login"
          index
          element={<RestrictedRoute redirectTo="/login" component={<Auth />} />}
        />
        <Route
          path="/"
          index
          element={<PrivateRoute redirectTo="/" component={<Contacts />} />}
        />
      </Route>
    </Routes>
  );
};
