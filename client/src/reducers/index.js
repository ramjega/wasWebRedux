import { combineReducers } from 'redux'
import counter from './counter'
import signUp from '../authentication/reducer'

const rootReducer = combineReducers({
  counter,
  signUp
});

export default rootReducer
