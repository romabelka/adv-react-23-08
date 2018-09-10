import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import firebase from 'firebase/app'
import {
  put,
  call,
  all,
  takeEvery,
  select,
  fork,
  spawn,
  cancel,
  cancelled,
  race,
  take
} from 'redux-saga/effects'
import { delay, eventChannel } from 'redux-saga'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { fbToEntities } from './utils'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_START = `${prefix}/ADD_PERSON_START`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const ADD_EVENT_TO_PERSON = `${prefix}/ADD_EVENT_TO_PERSON`

export const ADD_EVENT_REQUEST = `${prefix}/ADD_EVENT_REQUEST`
export const ADD_EVENT_SUCCESS = `${prefix}/ADD_EVENT_SUCCESS`

export const DELETE_PERSON_REQUEST = `${prefix}/DELETE_PERSON_REQUEST`
export const DELETE_PERSON_SUCCESS = `${prefix}/DELETE_PERSON_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new OrderedMap({})
})

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  events: []
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_SUCCESS:
      return state.set('entities', fbToEntities(payload, PersonRecord))

    case ADD_EVENT_SUCCESS:
      return state.setIn(
        ['entities', payload.personId, 'events'],
        payload.events
      )

    case DELETE_PERSON_SUCCESS:
      return state.deleteIn(['entities', payload.id])

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const peopleSelector = createSelector(stateSelector, (state) =>
  state.entities.valueSeq().toArray()
)
export const idSelector = (_, props) => props.id

export const personSelector = createSelector(
  stateSelector,
  idSelector,
  (state, id) => state.getIn(['entities', id])
)

/**
 * Action Creators
 * */
export const addPerson = (person) => ({
  type: ADD_PERSON_REQUEST,
  payload: { person }
})

export function fetchAllPeople() {
  return {
    type: FETCH_ALL_REQUEST
  }
}

export function addEventToPerson(eventId, personId) {
  return {
    type: ADD_EVENT_TO_PERSON,
    payload: { eventId, personId }
  }
}

export function deletePerson(id) {
  return {
    type: DELETE_PERSON_REQUEST,
    payload: { id }
  }
}

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

export function* addPersonSaga(action) {
  yield put({
    type: ADD_PERSON_START,
    payload: { ...action.payload.person }
  })

  const peopleRef = firebase.database().ref('people')

  const { key } = yield call([peopleRef, peopleRef.push], action.payload.person)

  yield put({
    type: ADD_PERSON_SUCCESS,
    payload: { id: key, ...action.payload.person }
  })

  yield put(reset('person'))
}

export function* fetchAllSaga() {
  const peopleRef = firebase.database().ref('people')

  try {
    const data = yield call([peopleRef, peopleRef.once], 'value')

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: data.val()
    })
  } catch (_) {}
}

export function* addEventToPersonSaga({ payload: { eventId, personId } }) {
  const eventsRef = firebase.database().ref(`people/${eventId}/events`)

  const state = yield select(stateSelector)
  const events = state.getIn(['entities', eventId, 'events']).concat(personId)

  yield call([eventsRef, eventsRef.set], events)

  yield put({
    type: ADD_EVENT_SUCCESS,
    payload: { events, eventId }
  })
}

export function* deletePersonSaga({ payload }) {
  const ref = firebase.database().ref(`people/${payload.id}`)

  try {
    yield call([ref, ref.remove])

    yield put({
      type: DELETE_PERSON_SUCCESS,
      payload
    })
  } catch (_) {}
}

export function* syncPeopleWithPolling() {
  try {
    while (true) {
      yield call(fetchAllSaga)
      yield delay(2000)
    }
  } finally {
    if (yield cancelled()) {
      console.log('---', 'saga was canceled')
    }
  }
}

export function* cancelableSyncSaga() {
  yield race({
    sync: syncPeopleWithPolling(),
    timeout: delay(5000)
  })

  throw new Error('Some network error')
  /*
  const process = yield fork(syncPeopleWithPolling)
  yield delay(5000)
  yield cancel(process)
*/
}

export const createPeopleChanel = () =>
  eventChannel((emit) => {
    const callback = (snapshot) => emit({ data: snapshot.val() })
    const ref = firebase.database().ref('people')

    ref.on('value', callback)

    return () => ref.off('value', callback)
  })

export function* syncPeopleRealtimeSaga() {
  const chanel = yield call(createPeopleChanel)
  while (true) {
    const { data } = yield take(chanel)

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: data
    })
  }
}

export function* saga() {
  console.log('---', 1)
  yield spawn(syncPeopleRealtimeSaga)
  console.log('---', 2)

  const result = yield all([
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(ADD_EVENT_REQUEST, addEventToPersonSaga),
    takeEvery(DELETE_PERSON_REQUEST, deletePersonSaga)
  ])

  console.log('---', 3, result)
}
