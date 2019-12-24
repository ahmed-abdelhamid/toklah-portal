import { combineReducers } from 'redux';
import authReducer from './authReducer';
import ticketsReducer from './ticketsReducer';
import usersReducer from './usersReducer';
import eventsReducer from './eventsReducer';

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  tickets: ticketsReducer,
  events: eventsReducer
});
