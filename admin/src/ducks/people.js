import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import { put, call, takeEvery, select, all } from 'redux-saga/effects'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { fbToEntities, generateId } from './utils'
import firebase from 'firebase/app'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`
export const ADD_PERSON_ERROR = `${prefix}/ADD_PERSON_ERROR`

export const FETCH_PEOPLE_REQUEST = `${prefix}/FETCH_PEOPLE_REQUEST`
export const FETCH_PEOPLE_START = `${prefix}/FETCH_PEOPLE_START`
export const FETCH_PEOPLE_SUCCESS = `${prefix}/FETCH_PEOPLE_SUCCESS`
export const FETCH_PEOPLE_ERROR = `${prefix}/FETCH_PEOPLE_ERROR`

/**
 * Reducer
 * */
const ReducerState = Record({
  loading: false,
  loaded: false,
  error: null,
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
    case ADD_PERSON_SUCCESS:
      return state.update('entities', (entities) =>
        entities.set(payload.person.id, new PersonRecord(payload.person))
      )
    case FETCH_PEOPLE_START:
      return state.set('loading', true)

    case FETCH_PEOPLE_SUCCESS:
      if (!payload) return state.set('loading', false).set('loaded', true)
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', fbToEntities(payload, PersonRecord))

    case FETCH_PEOPLE_ERROR:
    case ADD_PERSON_ERROR:
      return state
        .set('error', payload.error.message)
        .set('loading', false)
        .set('loaded', true)

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
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)
export const loadedSelector = createSelector(
  stateSelector,
  (state) => state.loaded
)
export const errorSelector = createSelector(
  stateSelector,
  (state) => state.error
)
/**
 * Action Creators
 * */
export const addPerson = (person) => ({
  type: ADD_PERSON_REQUEST,
  payload: { person }
})

export const fetchPeople = () => ({
  type: FETCH_PEOPLE_REQUEST
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
 * Sagas
 **/

export function* addPersonSaga(action) {
  try {
    const id = yield call(generateId)
    const ref = firebase.database().ref('people/' + id)

    yield call([ref, ref.set], action.payload.person)

    yield put({
      type: ADD_PERSON_SUCCESS,
      payload: {
        person: { id, ...action.payload.person }
      }
    })

    yield put(reset('person'))
  } catch (error) {
    yield put({
      type: ADD_PERSON_ERROR,
      payload: { error }
    })
  }
}

export function* fetchPeopleSaga() {
  try {
    const { loading, loaded } = yield select(stateSelector)
    if (loading || loaded) return
    const ref = firebase.database().ref('people')

    yield put({
      type: FETCH_PEOPLE_START
    })

    const snapshot = yield call([ref, ref.once], 'value')

    if (!snapshot) return

    yield put({
      type: FETCH_PEOPLE_SUCCESS,
      payload: snapshot.val()
    })
  } catch (error) {
    yield put({
      type: FETCH_PEOPLE_ERROR,
      payload: { error }
    })
  }
}

export function* saga() {
  yield all([
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    takeEvery(FETCH_PEOPLE_REQUEST, fetchPeopleSaga)
  ])
}
