import { createAsyncAction } from './utils'
import { appName } from '../config'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`
export const FETCH_SELECTED = createAsyncAction(`${prefix}/FETCH_SELECTED`)
export const TOGGLE_SELECT_SAVE = createAsyncAction(
  `${prefix}/TOGGLE_SELECT_SAVE`
)
export const TOGGLE_SELECT = `${prefix}/TOGGLE_SELECT`
export const FETCH_LAZY_REQUEST = `${prefix}/FETCH_LAZY_REQUEST`
export const FETCH_LAZY_START = `${prefix}/FETCH_LAZY_START`
export const FETCH_LAZY_SUCCESS = `${prefix}/FETCH_LAZY_SUCCESS`
export const REMOVE_EVENT = createAsyncAction(`${prefix}/REMOVE_EVENT`)
