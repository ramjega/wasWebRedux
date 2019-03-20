import { combineReducers } from 'redux'
import counter from './counter'
import authenticationReducer from '../authentication/reducer'

const rootReducer = combineReducers({
  counter,
  authenticationReducer
});

export default rootReducer
