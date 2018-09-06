import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import { put, call, all, takeEvery } from 'redux-saga/effects'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { fbToEntities, generateId } from './utils'
import firebase from 'firebase/app'
import { SIGN_IN_SUCCESS } from './auth'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new OrderedMap([])
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
    case FETCH_ALL_SUCCESS:
      return state.set('entities', payload)
    case ADD_PERSON_SUCCESS:
      return state.update('entities', (entities) =>
        entities.push(new PersonRecord(payload.person))
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

const sendToDB = (peson) =>
  firebase
    .database()
    .ref('people')
    .push(peson)

const getFromDB = () =>
  firebase
    .database()
    .ref('people')
    .once('value')
/**
 * Sagas
 **/

export function* addPersonSaga(action) {
  const id = yield call(generateId)
  yield call(sendToDB, action.payload.person)

  yield put({
    type: ADD_PERSON_SUCCESS,
    payload: {
      person: { id, ...action.payload.person }
    }
  })

  yield put(reset('person'))
}

export function* getPersonsDataSaga() {
  let peoples = yield call(getFromDB)
  peoples = peoples.val()

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: peoples ? fbToEntities(peoples, PersonRecord) : new OrderedMap([])
  })
}

export function* saga() {
  yield all([
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    takeEvery(SIGN_IN_SUCCESS, getPersonsDataSaga)
  ])
}
