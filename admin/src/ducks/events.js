import { all, takeEvery, put, select, call } from 'redux-saga/effects'
import { appName } from '../config'
import { Record, OrderedMap, OrderedSet } from 'immutable'
import firebase from 'firebase/app'
import { createSelector } from 'reselect'
import { fbToEntities } from './utils'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const FETCH_CHUNK_REQUEST = `${prefix}/FETCH_CHUNK_REQUEST`
export const FETCH_CHUNK_START = `${prefix}/FETCH_CHUNK_START`
export const FETCH_CHUNK_SUCCESS = `${prefix}/FETCH_CHUNK_SUCCESS`
export const FETCH_CHUNK_FINISH = `${prefix}/FETCH_CHUNK_FINISH`

export const TOGGLE_SELECT = `${prefix}/TOGGLE_SELECT`
export const UPDATE_LAST_ID = `${prefix}/UPDATE_LAST_ID`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  lastLoadedId: null,
  selected: new OrderedSet([]),
  entities: new OrderedMap()
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

    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', fbToEntities(payload, EventRecord))

    case FETCH_CHUNK_START:
      return state.set('loading', true)

    case FETCH_CHUNK_SUCCESS:
      return state
        .set('loading', false)
        .update('entities', (entities) =>
          entities.merge(fbToEntities(payload, EventRecord))
        )

    case TOGGLE_SELECT:
      return state.update(
        'selected',
        (selected) =>
          selected.has(payload.id)
            ? selected.remove(payload.id)
            : selected.add(payload.id)
      )

    case UPDATE_LAST_ID:
      return state.set('lastLoadedId', payload.id)

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

export function fetchEventsChunk() {
  return {
    type: FETCH_CHUNK_REQUEST
  }
}

export function toggleSelect(id) {
  return {
    type: TOGGLE_SELECT,
    payload: { id }
  }
}

/**
 * Sagas
 * */

export function* fecthChunkSaga() {
  const { loading, loaded, lastLoadedId } = yield select(stateSelector)
  if (loading || loaded) return

  const ref = lastLoadedId
    ? firebase
        .database()
        .ref('events')
        .orderByKey()
        .startAt(lastLoadedId)
        .limitToFirst(10)
    : firebase
        .database()
        .ref('events')
        .orderByKey()
        .limitToFirst(10)

  yield put({
    type: FETCH_CHUNK_START
  })

  const snapshot = yield call([ref, ref.once], 'value')
  const [id] = Object.keys(snapshot.val()).reverse()

  yield put({
    type: UPDATE_LAST_ID,
    payload: { id }
  })

  yield put({
    type: FETCH_CHUNK_SUCCESS,
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
  yield all([takeEvery(FETCH_CHUNK_REQUEST, fecthChunkSaga)])
}
