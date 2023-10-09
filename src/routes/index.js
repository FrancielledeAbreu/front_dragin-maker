import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';
import Contacts from '../pages/Contacts';
import ContactDetails from '../pages/ContactDetails';

export const routes = [
  { path: '/', element: <Login />, name: 'login' },
  { path: '/register', element: <Register />, name: 'Register' },
];
const RoutesComponent = () => {
  return (
    <Routes>
      {routes.map((route, key) => (
        <Route key={key} path={route.path} element={route.element} />
      ))}
      <Route
        path="/contacts"
        element={
          <PrivateRoute>
            <Contacts />
          </PrivateRoute>
        }
      />
      <Route
        path="/contacts/:id"
        element={
          <PrivateRoute>
            <ContactDetails />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default RoutesComponent;
