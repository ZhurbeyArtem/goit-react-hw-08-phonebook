import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { reducer as contactsReducer } from './contacts/contacts.slice';
import { reducer as filterReducer } from './filter/filter.slice';
import {reducer as userReducer} from './user/user.slice'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['contacts', 'filter'],
  whitelist: ['token']
};
const persistedReducer = persistReducer(persistConfig, userReducer);

const reducers = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
  user: persistedReducer,
});


export const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persister = persistStore(store);