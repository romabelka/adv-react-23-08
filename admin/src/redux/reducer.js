import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import users from '../ducks/users/reducers'

export default combineReducers({
  [authModule]: authReducer,
  form,
  users
})
