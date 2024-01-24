import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'https://connections-api.herokuapp.com/users';

const axiosInstance = axios.create({
  baseURL: baseURL,
});

const createAuthAsyncThunk = (type, endpoint) => {
  return createAsyncThunk(
    `user/${type}`,
    async (payload, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.post(endpoint, payload);
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
};

export const fetchRegister = createAuthAsyncThunk('register', '/signup');
export const fetchLogin = createAuthAsyncThunk('login', '/login');
export const fetchLogout = createAuthAsyncThunk('logout', '/logout');

export const fetchCurrentUser = createAsyncThunk(
  'user/current',
  async (token, { rejectWithValue }) => {
     try {
       const { data } = await axiosInstance.get('/current', token);
       return data;
     } catch (e) {
       return rejectWithValue(e.message);
     }
  }
)