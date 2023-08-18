import {combineReducers} from 'redux';
import generalSlice from './generalSlice';
import {lilipadCloudFunction} from '../apis';

export default combineReducers({
  generalSlice,
  [lilipadCloudFunction.reducerPath]: lilipadCloudFunction.reducer,
});
