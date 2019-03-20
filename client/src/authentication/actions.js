import { createAction } from 'redux-actions'
import authenticationSource from './source'

export const setSignUpRequest = createAction('SET_SIGN_UP_REQUEST');

export function signUp(variables) {
  return function (dispatch) {
    dispatch({type: 'SIGN_UP', payload:  authenticationSource.signUp(variables)});
  }

}
