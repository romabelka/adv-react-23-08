import { appName } from '../config'
import { List, OrderedMap, Record } from 'immutable'
import firebase from 'firebase/app'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { createAsyncAction, fbToEntities } from './utils'
import { REMOVE_EVENT } from './events-types'

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

export const ADD_EVENT_TO_PERSON = createAsyncAction(
  `${prefix}/ADD_EVENT_TO_PERSON`
)
export const REMOVE_PERSON = createAsyncAction(`${prefix}/REMOVE_PERSON`)
export const REMOVE_EVENT_FROM_PERSON = createAsyncAction(
  `${prefix}/REMOVE_EVENT_FROM_PERSON`
)
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

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON_SUCCESS:
      return state.setIn(['entities', payload.id], new PersonRecord(payload))

    case FETCH_ALL_SUCCESS:
      return state.set('entities', fbToEntities(payload, PersonRecord))

    case ADD_EVENT_TO_PERSON.SUCCESS:
      return state.setIn(
        ['entities', payload.personId, 'events', payload.eventId],
        payload.title
      )
    case REMOVE_PERSON.SUCCESS:
      return state.removeIn(['entities', payload.personId])
    case REMOVE_EVENT_FROM_PERSON.SUCCESS:
      return state.set(
        'entities',
        state.entities.map((entity) =>
          entity.removeIn(['events', payload.eventId])
        )
      )
    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const peopleSelector = createSelector(
  stateSelector,
  (state) => state.entities
)
export const peopleListSelector = createSelector(peopleSelector, (entities) =>
  entities.valueSeq().toJS()
)
export const idSelector = (_, props) => props.id

export const personSelector = createSelector(
  stateSelector,
  idSelector,
  (state, id) => state.getIn(['entities', id])
)
export const getPeopleByEventIdSelector = createSelector(
  (state, id) => id,
  peopleSelector,
  (eventId, people) => {
    console.log(eventId)
    return people.filter((person) => person.hasIn(['events', eventId]))
  }
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

export function addEventToPerson(eventId, personId, title) {
  return {
    type: ADD_EVENT_TO_PERSON.REQUEST,
    payload: { eventId, personId, title }
  }
}
export function removePerson(personId) {
  return {
    type: REMOVE_PERSON.REQUEST,
    payload: { personId }
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
 * API
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
export function* addPersonToEventSaga({
  payload: { eventId, personId, title }
}) {
  const personRef = firebase
    .database()
    .ref('people')
    .child(personId)
    .child('events')
    .child(eventId)
  yield call([personRef, personRef.set], title)
  yield put({
    type: ADD_EVENT_TO_PERSON.SUCCESS,
    payload: { eventId, personId, title }
  })
}
export function* removePersonSaga({ payload: { personId } }) {
  const personRef = firebase
    .database()
    .ref('people')
    .child(personId)
  yield call([personRef, personRef.remove])
  yield put({ type: REMOVE_PERSON.SUCCESS, payload: { personId } })
}
export function* removeEventFromPeopleSaga({ payload: { eventId } }) {
  yield put({ type: REMOVE_EVENT_FROM_PERSON.REQUEST, payload: { eventId } })
  const invitedPeople = yield select(getPeopleByEventIdSelector, eventId)
  const ids = invitedPeople.keySeq().toArray()

  for (let personId of ids) {
    const personRef = firebase
      .database()
      .ref('people')
      .child(`${personId}/events/${eventId}`)
    yield call([personRef, personRef.remove])
  }
  yield put({ type: REMOVE_EVENT_FROM_PERSON.SUCCESS, payload: { eventId } })
}
export function* saga() {
  yield all([
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(REMOVE_PERSON.REQUEST, removePersonSaga),
    takeEvery(REMOVE_EVENT.SUCCESS, removeEventFromPeopleSaga),
    takeEvery(ADD_EVENT_TO_PERSON.REQUEST, addPersonToEventSaga)
  ])
}
