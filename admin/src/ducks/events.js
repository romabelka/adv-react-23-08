import { all, call, put, select, take, takeEvery } from 'redux-saga/effects'
import { OrderedMap, Record } from 'immutable'
import firebase from 'firebase/app'
import { createSelector } from 'reselect'
import { fbToEntities } from './utils'
import { SIGN_IN_SUCCESS } from './auth'
import { peopleSelector } from './people'
import {
  FETCH_ALL_REQUEST,
  FETCH_ALL_START,
  FETCH_ALL_SUCCESS,
  FETCH_LAZY_REQUEST,
  FETCH_LAZY_START,
  FETCH_LAZY_SUCCESS,
  FETCH_SELECTED,
  moduleName,
  REMOVE_EVENT,
  TOGGLE_SELECT,
  TOGGLE_SELECT_SAVE
} from './events-types'

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  selected: new OrderedMap(),
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
export const SelectedEventRecord = Record({
  id: null,
  title: null,
  where: null,
  people: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_START:
    case FETCH_LAZY_START:
      return state.set('loading', true)

    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', fbToEntities(payload, EventRecord))

    case FETCH_LAZY_SUCCESS:
      return state
        .set('loading', false)
        .mergeIn(['entities'], fbToEntities(payload, EventRecord))
        .set('loaded', Object.keys(payload).length < 10)

    case FETCH_SELECTED.SUCCESS:
      return state.set('selected', fbToEntities(payload, SelectedEventRecord))

    case TOGGLE_SELECT_SAVE.SUCCESS:
      return state.update(
        'selected',
        (selected) =>
          selected.has(payload.id)
            ? selected.delete(payload.id)
            : selected.set(payload.id, new SelectedEventRecord(payload))
      )
    case REMOVE_EVENT.SUCCESS:
      return state
        .removeIn(['entities', payload.eventId])
        .removeIn(['selected', payload.eventId])
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
export const selectedSelector = createSelector(
  stateSelector,
  (state) => state.selected
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

export const selectedEventsListSelector = createSelector(
  selectedSelector,
  peopleSelector,
  (selected, people) =>
    selected
      .map((record) =>
        record.setIn(
          ['people'],
          people
            .filter((person) => person.hasIn(['events', record.id]))
            .valueSeq()
            .toArray()
            .map(({ firstName, lastName }) => ({ firstName, lastName }))
        )
      )
      .valueSeq()
      .toArray()
)

export const getEventByIdSelector = createSelector(
  (state, id) => id,
  entitiesSelector,
  (id, entities) => entities.get(id)
)
export const getSelectedEventByIdSelector = createSelector(
  (state, id) => id,
  selectedSelector,
  (id, selected) => selected.get(id)
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

export function fetchLazy() {
  return {
    type: FETCH_LAZY_REQUEST
  }
}
export function removeEvent(eventId) {
  return {
    type: REMOVE_EVENT.REQUEST,
    payload: { eventId }
  }
}

/**
 * API
 */
const addSelectedToFb = (id, data) =>
  firebase
    .database()
    .ref('events-selected')
    .child(id)
    .set(data)
const removeSelectedFromFb = (id, data) =>
  firebase
    .database()
    .ref('events-selected')
    .child(id)
    .remove()

const fetchSelectedEvents = () =>
  firebase
    .database()
    .ref('events-selected')
    .once('value')
    .then((snap) => snap.val())

const removeEventFromFb = (id) =>
  Promise.all([
    firebase
      .database()
      .ref('events')
      .child(id)
      .remove(),
    firebase
      .database()
      .ref('events-selected')
      .child(id)
      .remove()
  ])
const removeEventFromPerson = (eventId, personId) =>
  firebase
    .database()
    .ref('people')
    .child(personId)
    .child(`events/${eventId}`)
    .remove()
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

export const fetchLazySaga = function*() {
  while (true) {
    yield take(FETCH_LAZY_REQUEST)

    const state = yield select(stateSelector)

    if (state.loading || state.loaded) continue
    //        if (state.loaded) return

    yield put({
      type: FETCH_LAZY_START
    })

    const lastEvent = state.entities.last()

    const ref = firebase
      .database()
      .ref('events')
      .orderByKey()
      .limitToFirst(10)
      .startAt(lastEvent ? lastEvent.id : '')

    const data = yield call([ref, ref.once], 'value')

    yield put({
      type: FETCH_LAZY_SUCCESS,
      payload: data.val()
    })
  }
}
export function* toggleSelectSaga({ payload: { id } }) {
  try {
    yield put({ type: TOGGLE_SELECT_SAVE.REQUEST })
    const selected = yield select(getSelectedEventByIdSelector, id)
    const event = yield select(getEventByIdSelector, id)
    // дублируем чтобы было что показать, даже если не все ивенты загружены
    const data = {
      title: event.title,
      where: event.where
    }

    const updateMethod = !selected ? addSelectedToFb : removeSelectedFromFb
    yield call(updateMethod, id, data)

    yield put({ type: TOGGLE_SELECT_SAVE.SUCCESS, payload: { id, ...data } })
  } catch (error) {
    yield put({ type: TOGGLE_SELECT_SAVE.FAILURE, error: true, payload: error })
  }
}
export function* signInSuccessSaga() {
  yield put({ type: FETCH_SELECTED.REQUEST })
  const result = yield call(fetchSelectedEvents)
  if (result) yield put({ type: FETCH_SELECTED.SUCCESS, payload: result })
}

function* removeEventSaga({ payload: { eventId } }) {
  yield call(removeEventFromFb, eventId)
  yield put({ type: REMOVE_EVENT.SUCCESS, payload: { eventId } })
}
export function* saga() {
  yield all([
    takeEvery(SIGN_IN_SUCCESS, signInSuccessSaga),
    takeEvery(TOGGLE_SELECT, toggleSelectSaga),
    takeEvery(REMOVE_EVENT.REQUEST, removeEventSaga),
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    fetchLazySaga()
  ])
}
