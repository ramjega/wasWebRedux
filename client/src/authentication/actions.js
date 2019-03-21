import { createAction } from 'redux-actions'
import authenticationSource from './source'

export const setSignUpRequest = createAction('SET_SIGN_UP_REQUEST');
export const setSignInRequest = createAction('SET_SIGN_IN_REQUEST');
export const clearRequest = createAction('CLEAR_REQUEST');
export const clearSuccessAndErrors = createAction('CLEAR_SUCCESS_AND_ERRORS');

export function signUp(variables) {
  return function (dispatch) {
    dispatch({type: 'SIGN_UP', payload:  authenticationSource.signUp(variables)});
  }

}
export function signIn(variables) {
  return function (dispatch) {
    dispatch({type: 'SIGN_IN', payload:  authenticationSource.signIn(variables)});
  }

}
