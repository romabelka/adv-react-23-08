import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { appName } from '../config'
import { List, OrderedMap, OrderedSet, Record } from 'immutable'
import firebase from 'firebase/app'
import { createSelector } from 'reselect'
import { createAsyncAction, fbToEntities } from './utils'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const TOGGLE_SELECT = `${prefix}/TOGGLE_SELECT`
export const FETCH_EVENTS = createAsyncAction(`${prefix}/FETCH_EVENTS`)
/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  selected: new OrderedSet([]),
  entities: new OrderedMap(),
  indices: new List([]),
  count: Number.MAX_VALUE // мы не знаем сколько записей
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

    case TOGGLE_SELECT:
      return state.update(
        'selected',
        (selected) =>
          selected.has(payload.id)
            ? selected.remove(payload.id)
            : selected.add(payload.id)
      )
    case FETCH_EVENTS.SUCCESS:
      let indices = state.indices
      // чтобы можно было вставить на любой позиции
      indices = indices
        .setSize(
          indices.size < action.payload.startIndex
            ? action.payload.startIndex
            : indices.size
        )
        .splice(
          action.payload.startIndex,
          action.payload.stopIndex - action.payload.startIndex + 1,
          ...action.payload.indices
        )
      return state
        .set('indices', indices)
        .set('entities', state.entities.concat(action.payload.events))
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
  entities
    .entrySeq()
    .map(([id, value]) => ({ id, ...value }))
    .toArray()
)

export const selectedIdsSelector = createSelector(stateSelector, (state) =>
  state.selected.toArray()
)

export const selectedEventsListSelector = createSelector(
  selectedIdsSelector,
  entitiesSelector,
  (ids, entities) => ids.map((id) => entities.get(id))
)
export const eventsCountSelector = createSelector(
  stateSelector,
  (state) => state.count
)
export const eventsIndicesSelector = createSelector(stateSelector, (state) =>
  state.indices.toArray()
)
/**
 * Action Creators
 * */

export function fetchAllEvents() {
  return {
    type: FETCH_ALL_REQUEST
  }
}

export const fetchEvents = (startIndex, stopIndex, { resolve, reject }) => ({
  type: FETCH_EVENTS.REQUEST,
  payload: { startIndex, stopIndex, resolve, reject }
})

export const fetchEventsSuccess = (indices, events, startIndex, stopIndex) => ({
  type: FETCH_EVENTS.SUCCESS,
  payload: { indices, events, startIndex, stopIndex }
})

export function toggleSelect(id) {
  return {
    type: TOGGLE_SELECT,
    payload: { id }
  }
}

/**
 * API
 */

const fetchPageQuery = (pageSize, startAtKey) => {
  console.log(`pageSize :${pageSize}`)
  const query = firebase
    .database()
    .ref('events')
    .orderByKey()
    .limitToFirst(pageSize)
  return startAtKey ? query.startAt(startAtKey) : query
}

/**
 * Sagas
 * */

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
export function* fetchEventsSaga({
  payload: { startIndex, stopIndex, resolve, reject }
}) {
  try {
    console.log(`fetchEventsSaga start: ${startIndex}, stop: ${stopIndex}`)
    const indices = yield select(eventsIndicesSelector)
    const startAtKey = indices[startIndex - 1]
      ? indices[startIndex - 1]
      : undefined

    const ref = fetchPageQuery(stopIndex - startIndex + 1, startAtKey)
    const snapshot = yield call([ref, ref.once], 'value')
    const events = snapshot.val()
    const newIndices = Object.keys(events)

    yield put(fetchEventsSuccess(newIndices, events, startIndex, stopIndex))
    resolve()
  } catch (error) {
    yield put({ type: FETCH_EVENTS.FAILURE, error: true, payload: error })
    reject()
  }
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(FETCH_EVENTS.REQUEST, fetchEventsSaga)
  ])
}
