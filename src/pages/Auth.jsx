import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchRegister, fetchLogin } from '../redux/user/api.js';
import { Notify } from 'notiflix';

export const Auth = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const apiAction =
      location.pathname === '/login' ? fetchLogin : fetchRegister;
    try {
      const result = await dispatch(apiAction(formData));
      if (result?.error) {
        const errorMessage =
          location.pathname === '/login'
            ? 'Email or password incorrect'
            : 'User with the same email is already registered';
        Notify.failure(errorMessage);
        return;
      }

      navigate('/');
    } catch (error) {
      Notify.failure('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {location.pathname === '/register' ? `Registration` : 'Login'}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required={true}
            type="email"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleInputChange}
          />
          {location.pathname === '/register' && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              type="text"
              label="Full Name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {location.pathname === '/register' ? `Register` : 'Login'}
          </Button>

          <nav>
            {location.pathname === '/register' ? (
              <>Have account? {<NavLink to="/login">Login</NavLink>}</>
            ) : (
              <>
                Don`t have account? {<NavLink to="/register">Register</NavLink>}
              </>
            )}
          </nav>
        </Box>
      </Box>
    </Container>
  );
};
