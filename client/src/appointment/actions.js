import { createAction } from 'redux-actions'
import appointmentSource from './source'

export const setAppointmentRequest = createAction('SET_APPOINTMENT_REQUEST');
export const clearRequest = createAction('CLEAR_REQUEST');

export function createAppointment(variables) {
  return function (dispatch) {
    dispatch({type: 'CREATE_APPOINTMENT', payload:  appointmentSource.createAppointment(variables)});
  }

}
