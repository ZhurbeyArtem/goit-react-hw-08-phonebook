import { privateRouter, publicRouter } from '../routes/consts';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/user/selectors';
import Navbar from './navbar/Navbar';

export const App = () => {
  const isAuth = useSelector(getUser);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {isAuth
            ? privateRouter.map(({ path, Element }) => (
                <Route key={path} path={path} element={<Element />} />
              ))
            : publicRouter.map(({ path, Element }) => (
                <Route key={path} path={path} element={<Element />} />
              ))}
        </Routes>
      </BrowserRouter>
    </>
  );
  // return <RouterProvider router={publicRouter} />;
};
