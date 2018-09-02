import { appName } from '../config'
import { Record, List } from 'immutable'
import { put, call, takeEvery } from 'redux-saga/effects'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import firebase from 'firebase/app'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const LOAD_EVENTS_REQUEST = `${prefix}/LOAD_EVENTS_REQUEST`
export const LOAD_EVENTS_SUCCESS = `${prefix}/LOAD_EVENTS_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new List([])
})

const EventRecord = Record({
  id: null,
  title: null,
  url: null,
  when: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case LOAD_EVENTS_SUCCESS:
      return state.update('entities', (entities) =>
        entities.concat(payload.events.map((event) => new EventRecord(event)))
      )

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const eventsSelector = createSelector(stateSelector, (state) =>
  state.entities.valueSeq().toArray()
)

/**
 * Action Creators
 * */
export const loadEvents = () => ({ type: LOAD_EVENTS_REQUEST })

/*
export function addPerson(person) {
  return (dispatch) => {
    dispatch({
      type: ADD_PERSON,
      payload: {
        person: { id: Date.now(), ...person }
      }
    })

    dispatch(reset('person'))
  }
}
*/

/**
 * Sagas
 **/

export function* loadEventsSaga(action) {
  const getEventsMap = () =>
    firebase
      .database()
      .ref('/events')
      .once('value')
      .then((item) => item.val())

  const prepareEvents = (data) =>
    Object.keys(data).map((id) => ({
      id,
      ...data[id]
    }))

  const map = yield call(getEventsMap)
  const events = yield call(prepareEvents, map)

  yield put({
    type: LOAD_EVENTS_SUCCESS,
    payload: { events }
  })
}

export function* saga() {
  yield takeEvery(LOAD_EVENTS_REQUEST, loadEventsSaga)
}
