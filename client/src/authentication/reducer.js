import {Router, browserHistory} from 'react-router'

export default function reducer(state = {

  signUpRequest: {
    name: '',
    email: '',
    password: ''
  },
  signInRequest: {
    email: '',
    password: ''
  },
  success: {},
  errors: {
    summary: '',

  },
  mutateState: 0

}, action) {
  switch (action.type) {
    case 'SET_SIGN_UP_REQUEST':
      return {...state, signUpRequest: action.payload};

    case 'SET_SIGN_IN_REQUEST':
      return {...state, signInRequest: action.payload};


    case 'SIGN_UP_PENDING': {
      return {...state, mutateState: 1}
    }
    case 'SIGN_UP_FULFILLED': {
      browserHistory.push("/signIn");
      return {...state, mutateState: 2, success: action.payload}
    }
    case 'SIGN_UP_REJECTED': {
      return {...state, mutateState: 3, errors: action.payload}
    }


    case 'SIGN_IN_PENDING': {
      return {...state, mutateState: 1}
    }
    case 'SIGN_IN_FULFILLED': {
      browserHistory.push("/");
      return {...state, mutateState: 2, success: action.payload}
    }
    case 'SIGN_IN_REJECTED': {
      return {...state, mutateState: 3, errors: action.payload}
    }
    default:
      return state
  }
}
