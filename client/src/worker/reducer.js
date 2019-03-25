export default function reducer(state = {

  workerRequest: {
    job: '',
    experience: '',
    paymentInfo: '',
    mobileNumber: '',
    notes: ''
  },
  workers: [],
  fetchState: 0,
  mutateState: 0

}, action) {
  switch (action.type) {
    case 'SET_WORK_REQUEST':
      return {...state, workerRequest: action.payload};

    case 'SET_APPOINTMENT_REQUEST':
      return {...state, workerRequest: action.payload};

    case 'CLEAR_REQUEST':
      return {...state, workerRequest: {job: '', experience: '', paymentInfo: '', mobileNumber: '', notes: ''}};


    case 'CREATE_WORKER_PENDING': {
      return {...state, mutateState: 1}
    }
    case 'CREATE_WORKER_FULFILLED': {
      return {...state, mutateState: 2, success: action.payload}
    }
    case 'CREATE_WORKER_REJECTED': {
      return {...state, mutateState: 3, errors: action.payload}
    }

    case 'FETCH_WORKERS_PENDING': {
      return {...state, fetchState: 1}
    }
    case 'FETCH_WORKERS_FULFILLED': {
      return {...state, fetchState: 2, workers: action.payload}
    }
    case 'FETCH_WORKERS_REJECTED': {
      return {...state, fetchState: 3, errors: action.payload}
    }

    default:
      return state
  }
}
