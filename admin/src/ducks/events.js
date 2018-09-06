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

export const TOGGLE_SELECT = `${prefix}/TOGGLE_SELECT`
export const FETCH_CHUNCK = `${prefix}/FETCH_CHUNCK`
export const FETCH_CHUNCK_SUCCESSFULL = `${prefix}/FETCH_CHUNCK_SUCCESSFULL`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  selected: new OrderedSet([]),
  entities: new OrderedMap([]),
  count: 10
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
      const res = fbToEntities(payload.events, EventRecord)
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', fbToEntities(payload.events, EventRecord))
        .set('count', payload.count)

    case FETCH_CHUNCK_SUCCESSFULL:
      let events
      let count
      if (payload.events) {
        events = state
          .get('entities')
          .merge(fbToEntities(payload.events, EventRecord))
        count = payload.count
      } else {
        events = state.get('entities')
        count = state.get('entities').toArray().length
      }
      return state.set('entities', events).set('count', count)

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

export const selectEventsCount = createSelector(
  stateSelector,
  (state) => state.count
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

export function getChunck({ startIndex, stopIndex }) {
  return {
    type: FETCH_CHUNCK,
    payload: { startIndex, stopIndex }
  }
}

/**
 * Sagas
 * */

export function* fetchChunck({ payload }) {
  const { count } = yield select(stateSelector)
  const start = payload.startIndex - 1
  const events = yield select(eventListSelector)
  const startItem = events[payload.startIndex - 1]
  const howManyToLoad = payload.stopIndex - start
  const ref = firebase
    .database()
    .ref('events')
    .orderByKey()
    .limitToFirst(howManyToLoad)
    .startAt(startItem.id)

  const snapshot = yield call([ref, ref.once], 'value')

  const payload0 = snapshot.val()
  yield put({
    type: FETCH_CHUNCK_SUCCESSFULL,
    payload: {
      events: payload0,
      count: count + howManyToLoad
    }
  })
}

export function* fetchAllSaga() {
  const { loading, loaded, count } = yield select(stateSelector)
  if (loading || loaded) return

  const ref = firebase
    .database()
    .ref('events')
    .orderByKey()
    .limitToFirst(10)
  yield put({
    type: FETCH_ALL_START
  })

  const snapshot = yield call([ref, ref.once], 'value')
  const payload = snapshot.val()
  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: {
      events: payload,
      count: count + 10
    }
  })
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(FETCH_CHUNCK, fetchChunck)
  ])
}
