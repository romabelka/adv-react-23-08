import { appName } from '../config'
import { List } from 'immutable'
import { database } from '../config'
import UUID from 'uuid'
import { reset } from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'user'
const prefix = `${appName}/${moduleName}`

export const CREATE_USER_SUCCESS = `${prefix}/CRETAE_USER_SUCCESS`
export const EDIT_USER_SUCCESS = `${prefix}/EDIT_USER_SUCCESS`
export const GET_ALL_USER_SUCCESS = `${prefix}/GET_ALL_USER_SUCCESS`


/**
 * Reducer
 */
export const userList = new List([])

export default function reducer(state = userList, action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_USER_SUCCESS:
      console.log(payload)
      return state.push(payload.user)
    case GET_ALL_USER_SUCCESS:
      return new List(payload.users)
    default:
      return state
  }
}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export function createUserAction(email, firstName, lastName, userId = UUID.v4()) {
  return (dispatch) => {
    const user = {
      firstName,
      lastName,
      email: email,
      id: userId,
      isAdmin: false
    }
    database
      .ref('users/' + userId)
      .set(user)
      .then(() => {
        dispatch(reset('createUser'))
        dispatch({
          type: CREATE_USER_SUCCESS,
          payload: { user: user }
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export function getAllUserAction() {
  return (dispatch) => {
    database
      .ref('users/')
      .once('value')
      .then(function(snapshot) {
        const allUsers = (snapshot.val() && snapshot.val()) || {}
        const resultArray = Object.keys(allUsers).map(key => allUsers[key])
        dispatch({
          type: GET_ALL_USER_SUCCESS,
          payload: { users: new List(resultArray) }
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}