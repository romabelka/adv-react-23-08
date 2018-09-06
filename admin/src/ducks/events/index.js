import { all, takeEvery, put, select, call } from 'redux-saga/effects'
import { appName } from '../../config'
import { Record, OrderedMap, OrderedSet } from 'immutable'
import firebase from 'firebase/app'
import { createSelector } from 'reselect'
import { getLastId, fbToEntities } from '../utils'
import { ITEMS_NUMBER } from './constants'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_CHUNK_START = `${prefix}/FETCH_CHUNK_START`
export const FETCH_CHUNK = `${prefix}/FETCH_CHUNK`
export const FETCH_CHUNK_REQUEST = `${prefix}/FETCH_CHUNK_REQUEST`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const TOGGLE_SELECT = `${prefix}/TOGGLE_SELECT`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  selected: new OrderedSet([]),
  entities: new OrderedMap(),
  loadedId: ''
})

export const EventRecord = Record({
  id: null,
  month: null,
  submissionDeadline: null,
  title: null,
  url: null,
  when: null,
  where: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_START:
      return state.set('loading', true)
    case FETCH_CHUNK_REQUEST:
      return state.set('loaded', false)
    case FETCH_CHUNK_START:
      return state.set('loading', true)
    case FETCH_CHUNK:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('loadedId', getLastId(payload))
        .update('entities', (items) =>
          items.merge(fbToEntities(payload, EventRecord))
        )

    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', fbToEntities(payload, EventRecord))

    case TOGGLE_SELECT:
      return state.update(
        'selected',
        (selected) =>
          selected.has(payload.id)
            ? selected.remove(payload.id)
            : selected.add(payload.id)
      )

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const entitiesSelector = createSelector(
  stateSelector,
  (state) => state.entities
)
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)
export const loadedSelector = createSelector(
  stateSelector,
  (state) => state.loaded
)
export const eventListSelector = createSelector(entitiesSelector, (entities) =>
  entities.valueSeq().toArray()
)

export const selectedIdsSelector = createSelector(stateSelector, (state) =>
  state.selected.toArray()
)

export const selectedEventsListSelector = createSelector(
  selectedIdsSelector,
  entitiesSelector,
  (ids, entities) => ids.map((id) => entities.get(id))
)
/**
 * Action Creators
 * */

export function fetchAllEvents() {
  return {
    type: FETCH_ALL_REQUEST
  }
}

export function toggleSelect(id) {
  return {
    type: TOGGLE_SELECT,
    payload: { id }
  }
}

export function fetchChunkEvents() {
  return {
    type: FETCH_CHUNK_REQUEST
  }
}

/**
 * Sagas
 * */

export function* fetchChunkSaga() {
  const { loading, loaded, loadedId } = yield select(stateSelector)

  if (loading || loaded) return

  const ref = firebase
    .database()
    .ref('events')
    .startAt(loadedId)
    .orderByKey()
    .limitToFirst(ITEMS_NUMBER)

  yield put({
    type: FETCH_CHUNK_START
  })

  const snapshot = yield call([ref, ref.once], 'value')

  yield put({
    type: FETCH_CHUNK,
    payload: snapshot.val()
  })
}

export function* fetchAllSaga() {
  const { loading, loaded } = yield select(stateSelector)

  if (loading || loaded) return

  const ref = firebase.database().ref('events')

  yield put({
    type: FETCH_ALL_START
  })

  const snapshot = yield call([ref, ref.once], 'value')

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: snapshot.val()
  })
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(FETCH_CHUNK_REQUEST, fetchChunkSaga)
  ])
}
