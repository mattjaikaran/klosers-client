import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth from './authSlice';
import user from './userSlice';
import { userApi } from './userApi';
import { referenceApi } from './referenceApi';
import { statApi } from './statApi';
import { awardApi } from './awardApi';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: auth,
  user: user,
  [userApi.reducerPath]: userApi.reducer,
  [referenceApi.reducerPath]: referenceApi.reducer,
  [statApi.reducerPath]: statApi.reducer,
  [awardApi.reducerPath]: awardApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Global store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      userApi.middleware,
      referenceApi.middleware,
      statApi.middleware,
      awardApi.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production',
});
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
