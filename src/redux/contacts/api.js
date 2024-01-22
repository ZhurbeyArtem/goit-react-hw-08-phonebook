import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'https://65ab0055fcd1c9dcffc61174.mockapi.io/contacts';

const axiosInstance = axios.create({
  baseURL: baseURL,
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
