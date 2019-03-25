import { combineReducers } from 'redux'
import counter from './counter'
import authenticationReducer from '../authentication/reducer'
import workerReducer from '../worker/reducer'
import appointmentReducer from '../appointment/reducer'

const rootReducer = combineReducers({
  counter,
  authenticationReducer,
  workerReducer,
  appointmentReducer,
});

export default rootReducer
