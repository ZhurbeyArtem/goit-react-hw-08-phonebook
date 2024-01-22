import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, fetchAddContacts, fetchRemoveContact } from './api';

const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    const setLoading = (state, action) => {
      state.isLoading = true;
      state.error = null;
    };

    const setLoaded = (state, action) => {
      state.isLoading = false;
    };

    const setError = (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.contacts = [];
    };

    builder
      //get all contacts
      .addCase(fetchContacts.pending, setLoading)
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        setLoaded(state);
        state.contacts = payload;
      })
      .addCase(fetchContacts.rejected, setError)
      //add contact
      .addCase(fetchAddContacts.pending, setLoading)
      .addCase(fetchAddContacts.fulfilled, (state, { payload }) => {
        setLoaded(state);
        state.contacts = [...state.contacts, payload];
      })
      .addCase(fetchAddContacts.rejected, setError)
      //remove contact
      .addCase(fetchRemoveContact.pending, setLoading)
      .addCase(fetchRemoveContact.fulfilled, (state, { payload }) => {
        setLoaded(state);
        state.contacts = state.contacts.filter(
          contact => contact.id !== payload.id
        );
      })
      .addCase(fetchRemoveContact.rejected, setError);
  },
});

export const { actions, reducer } = contactsSlice;
