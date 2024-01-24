import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

const createAuthAsyncThunk = (type, endpoint) => {
  return createAsyncThunk(
    `user/${type}`,
    async (payload, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(endpoint, payload);
        if (endpoint === '/users/logout') clearAuthHeader();
        else setAuthHeader(data.token);
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
};

export const fetchRegister = createAuthAsyncThunk('register', '/users/signup');
export const fetchLogin = createAuthAsyncThunk('login', '/users/login');
export const fetchLogout = createAuthAsyncThunk('logout', '/users/logout');

export const fetchCurrentUser = createAsyncThunk(
  'user/current',
  async (token, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.user.token;
    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      return rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(persistedToken);
      const { data } = await axios.get('/users/current');
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
