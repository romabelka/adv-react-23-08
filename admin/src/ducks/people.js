import { appName } from '../config'
import { List, OrderedMap, Record } from 'immutable'
import { call, put, takeEvery, all } from 'redux-saga/effects'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import {
  createAsyncAction,
  fbToEntities,
  fbToEntitiesList,
  generateId
} from './utils'
import { SIGN_IN_SUCCESS } from './auth'
import firebase from 'firebase/app'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`
export const FETCH_ALL_PEOPLE = createAsyncAction(`${prefix}/FETCH_ALL_PERSONS`)
/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new OrderedMap()
})

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_PEOPLE.SUCCESS:
      return state.set('entities', action.payload)
    case ADD_PERSON_SUCCESS:
      return state.update('entities', (entities) =>
        entities.set(
          action.payload.person.id,
          new PersonRecord(action.payload.person)
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
export const peopleSelector = createSelector(stateSelector, (state) =>
  state.entities.valueSeq().toArray()
)

/**
 * Action Creators
 * */
export const addPerson = (person) => ({
  type: ADD_PERSON_REQUEST,
  payload: { person }
})

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
const fetchPeople = () =>
  firebase
    .database()
    .ref('people')
    .once('value')
    .then((snap) => fbToEntities(snap.val(), PersonRecord))

export const addPeopleToFb = (data) =>
  firebase
    .database()
    .ref('people')
    .push(data)

/**
 * Sagas
 **/

export function* addPersonSaga(action) {
  const result = yield call(addPeopleToFb, action.payload.person)
  const id = result.key
  yield put({
    type: ADD_PERSON_SUCCESS,
    payload: {
      person: { id, ...action.payload.person }
    }
  })

  yield put(reset('person'))
}

export function* signInSuccessSaga() {
  yield put({ type: FETCH_ALL_PEOPLE.REQUEST })
  const result = yield call(fetchPeople)
  yield put({
    type: FETCH_ALL_PEOPLE.SUCCESS,
    payload: result || new OrderedMap([])
  })
}

export function* saga() {
  yield all([
    yield takeEvery(SIGN_IN_SUCCESS, signInSuccessSaga),
    yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
  ])
}
