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
};

const reducers = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
  user: userReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persister = persistStore(store);