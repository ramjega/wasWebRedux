import { combineReducers } from 'redux'
import counter from './counter'
import signUp from './signUp'

const rootReducer = combineReducers({
  counter,
  signUp
});

export default rootReducer
