import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import {lilipadCloudFunction} from './apis';
import allReducers from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: undefined,
  blacklist: [lilipadCloudFunction.reducerPath],
};

const rootReducer = (state, action) => {
  // if (action.type === 'LOGOUT') {
  //   AsyncStorage.removeItem('persist:root')
  //   return allReducers(undefined, action);
  // }
  return allReducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk, lilipadCloudFunction.middleware),
});

export const persistor = persistStore(store);
