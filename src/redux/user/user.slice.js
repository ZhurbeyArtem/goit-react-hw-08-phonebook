import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentUser, fetchLogin, fetchLogout, fetchRegister } from './api';

const initialState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'user',
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
      state.user = null;
    };

    builder
      //register
      .addCase(fetchRegister.pending, setLoading)
      .addCase(fetchRegister.fulfilled, (state, { payload }) => {
        setLoaded(state);
        console.log(payload);
        state.user = payload;
      })
      .addCase(fetchRegister.rejected, setError)
      //login
      .addCase(fetchLogin.pending, setLoading)
      .addCase(fetchLogin.fulfilled, (state, { payload }) => {
        setLoaded(state);
        console.log(payload);
        state.user = payload;
      })
      .addCase(fetchLogin.rejected, setError)
      //logout
      .addCase(fetchLogout.pending, setLoading)
      .addCase(fetchLogout.fulfilled, (state, { payload }) => {
        setLoaded(state);
        state.user = null;
      })
      .addCase(fetchLogout.rejected, setError)

      //get user
      .addCase(fetchCurrentUser.pending, setLoading)
      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        setLoaded(state);
        console.log(payload);
        state.user = payload;
      })
      .addCase(fetchCurrentUser.rejected, setError);
  },
});

export const { actions, reducer } = contactsSlice;
