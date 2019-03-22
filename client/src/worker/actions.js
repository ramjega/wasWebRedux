import { createAction } from 'redux-actions'
import workerSource from './source'

export const setWorkerRequest = createAction('SET_WORK_REQUEST');
export const clearRequest = createAction('CLEAR_REQUEST');

export function createWorker(variables) {
  return function (dispatch) {
    dispatch({type: 'CREATE_WORKER', payload:  workerSource.createWorker(variables)});
  }

}
