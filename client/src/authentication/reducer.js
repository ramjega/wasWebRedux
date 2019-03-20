export default function reducer(state = {

  signUpRequest: {
    name: '',
    email: '',
    password: ''
  },
  success: {},
  errors:{
    summary:''
  },
  mutateState: 0

}, action) {
  switch (action.type) {
    case 'SET_SIGN_UP_REQUEST':
      return {...state, signUpRequest: action.payload};

    case 'SIGN_UP_PENDING':
    {
      return {...state, mutateState: 1}
    }
    case 'SIGN_UP_FULFILLED':
    {
      return {...state, mutateState: 2, success: action.payload}
    }
    case 'SIGN_UP_REJECTED':
    {
      return {...state, mutateState: 3, errors: action.payload}
    }
    default:
      return state
  }
}
