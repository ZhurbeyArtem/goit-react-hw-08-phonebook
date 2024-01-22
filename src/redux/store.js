import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducer as contactsReducer } from './contacts/contacts.slice';
import { reducer as filterReducer } from './filter/filter.slice';


const reducers = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

export const store = configureStore({
  reducer: reducers,
  devTools: true,
});

