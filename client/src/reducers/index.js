import { combineReducers } from 'redux'
import counter from './counter'
import authenticationReducer from '../authentication/reducer'
import workerReducer from '../worker/reducer'

const rootReducer = combineReducers({
  counter,
  authenticationReducer,
  workerReducer
});

export default rootReducer
