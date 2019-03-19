
const initialState = 0;

export default function setSignUpRequest(state = initialState, action) {
  switch (action.type) {
    case 'SET_SIGN_UP_REQUEST':
      return state + 40;
    default:
      return state
  }
}
