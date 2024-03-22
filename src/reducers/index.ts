
import { combineReducers } from 'redux';

import userListReducer from './userListReducer'; 

const rootReducer = combineReducers({
  userList: userListReducer, 
});

export default rootReducer;
