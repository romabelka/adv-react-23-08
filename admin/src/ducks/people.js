import { appName } from '../config'
import { Record, List, OrderedMap } from 'immutable'
import firebase from 'firebase/app'
import { put, call, all, takeEvery, select } from 'redux-saga/effects'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { fbToEntities } from './utils'
import { entitiesSelector as eventsSelector } from './events'

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

export const ADD_EVENT_TO_PERSON_REQUEST = `${prefix}/ADD_EVENT_TO_PERSON_REQUEST`
export const ADD_EVENT_TO_PERSON_SUCCESS = `${prefix}/ADD_EVENT_TO_PERSON_SUCCESS`

export const REMOVE_EVENT_FROM_PERSON_REQUEST = `${prefix}/REMOVE_EVENT_FROM_PERSON_REQUEST`
export const REMOVE_EVENT_FROM_PERSON_SUCCESS = `${prefix}/REMOVE_EVENT_FROM_PERSON_SUCCESS`

export const DROP_PERSON_REQUEST = `${prefix}/DROP_PERSON_REQUEST`
export const DROP_PERSON_SUCCESS = `${prefix}/DROP_PERSON_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new List([])
})

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  events: new OrderedMap()
})

const EventAttendanceRecord = Record({
  id: null,
  title: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON_SUCCESS:
      return state.setIn(['entities', payload.id], new PersonRecord(payload))

    case FETCH_ALL_SUCCESS:
      return state.set(
        'entities',
        fbToEntities(payload, PersonRecord, ({ events, ...rest }) => ({
          events: fbToEntities(events, EventAttendanceRecord),
          ...rest
        }))
      )

    case ADD_EVENT_TO_PERSON_SUCCESS:
      const { eventId, personId, eventTitle } = payload
      return state.setIn(
        ['entities', personId, 'events', eventId],
        new EventAttendanceRecord({ id: eventId, title: eventTitle })
      )

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const peopleSelector = createSelector(stateSelector, (state) =>
  state.entities
    .valueSeq()
    .toArray()
    .map((p) => {
      const { events, ...rest } = p.toJS()
      return { events: Object.values(events), ...rest }
    })
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
    type: ADD_EVENT_TO_PERSON_REQUEST,
    payload: { eventId, personId }
  }
}

export function removeEventFromPerson(eventId, personId) {
  return {
    type: REMOVE_EVENT_FROM_PERSON_REQUEST,
    payload: { eventId, personId }
  }
}

export function dropPerson(id) {
  return {
    type: DROP_PERSON_REQUEST,
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

export function* addEventToPersonSaga(action) {
  const { eventId, personId } = action.payload
  const ref = firebase.database().ref(`people/${personId}/events`)
  try {
    const person = yield select(personSelector, { id: personId })
    if (person.events.has(eventId)) return

    const eventTitle = (yield select(eventsSelector)).get(eventId).title
    yield call([ref, ref.update], { [eventId]: { title: eventTitle } })

    yield put({
      type: ADD_EVENT_TO_PERSON_SUCCESS,
      payload: { personId, eventId, eventTitle }
    })
  } catch (_) {}
}

export function* saga() {
  yield all([
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(ADD_EVENT_TO_PERSON_REQUEST, addEventToPersonSaga)
  ])
}
