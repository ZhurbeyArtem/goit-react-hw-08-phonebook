import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'https://connections-api.herokuapp.com/';

const { user } = JSON.parse(localStorage.getItem('persist:root'));
const { token } = JSON.parse(user).user;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchAddContacts = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/contacts', contact);
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const fetchContacts = createAsyncThunk(
  'contacts/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/contacts');
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.message);
    }
  }
);

export const fetchRemoveContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/contacts/${id}`);
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchUpdateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, name, number }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/contacts/${id}`, {
        name,
        number
      });
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
