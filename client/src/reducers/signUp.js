import ActionTypes from '../constants/actionTypes'

const initialState = 0;

export default function signUp(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SIGN_UP:
      return state + 1;
    default:
      return state
  }
}
