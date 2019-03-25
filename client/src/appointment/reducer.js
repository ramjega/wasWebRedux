export default function reducer(state = {

  appointmentRequest: {},
  mutateState: 0

}, action) {
  switch (action.type) {
    case 'SET_APPOINTMENT_REQUEST':
      return {...state, appointmentRequest: action.payload};

    case 'CLEAR_REQUEST':
      return {...state, appointmentRequest: {}};


    case 'CREATE_APPOINTMENT_PENDING': {
      return {...state, mutateState: 1}
    }
    case 'CREATE_APPOINTMENT_FULFILLED': {
      return {...state, mutateState: 2, success: action.payload}
    }
    case 'CREATE_APPOINTMENT_REJECTED': {
      return {...state, mutateState: 3, errors: action.payload}
    }

    default:
      return state
  }
}
