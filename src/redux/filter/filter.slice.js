import { createSlice } from "@reduxjs/toolkit";
import { changeFilter, getFilter } from './selectors';

let initialState = '';

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    getFilter: (state) => getFilter(state),
    changeFilter: (state, { payload }) => changeFilter(state, payload)
  }
})

export const { actions, reducer } = filterSlice;
