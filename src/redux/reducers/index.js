import {combineReducers} from 'redux';
import generalSlice from './generalSlice';
import userSlice from './userSlice';
import {lilipadCloudFunction} from '../apis';

export default combineReducers({
  generalSlice,
  userSlice,
  [lilipadCloudFunction.reducerPath]: lilipadCloudFunction.reducer,
});
