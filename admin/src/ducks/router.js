import { put, takeEvery } from 'redux-saga/effects'
import { GET_EVENTS_REQUEST } from './events'
/**
 * Constants
 * */
export const moduleName = '@@router'
const prefix = `${moduleName}`

export const LOCATION_CHANGE = `${prefix}/LOCATION_CHANGE`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

/**
 * Sagas
 **/

export function* routerSaga(action) {
  switch (action.payload.location.pathname) {
    case '/admin/events':
      yield put({
        type: GET_EVENTS_REQUEST
      })
      break
    default:
      yield
  }
}

export function* saga() {
  yield takeEvery(LOCATION_CHANGE, routerSaga)
}
