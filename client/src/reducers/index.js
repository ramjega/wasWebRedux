import { combineReducers } from 'redux'
import counter from './counter'
import signUpReducer from '../authentication/reducer'

const rootReducer = combineReducers({
  counter,
  signUpReducer
});

export default rootReducer
