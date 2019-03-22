import {browserHistory} from 'react-router'

export default function reducer(state = {

  workerRequest: {
    job: '',
    experience: '',
    paymentInfo: '',
    mobileNumber: '',
    notes: ''
  },
  mutateState: 0

}, action) {
  switch (action.type) {
    case 'SET_WORK_REQUEST':
      return {...state, workerRequest: action.payload};

    case 'CLEAR_REQUEST':
      return {...state, workerRequest: {job: '', experience: '', paymentInfo: '', mobileNumber: '', notes: ''}};


    case 'CREATE_WORKER_PENDING': {
      return {...state, mutateState: 1}
    }
    case 'CREATE_WORKER_FULFILLED': {
      browserHistory.push("/");
      return {...state, mutateState: 2, success: action.payload}
    }
    case 'CREATE_WORKER_REJECTED': {
      return {...state, mutateState: 3, errors: action.payload}
    }

    default:
      return state
  }
}
