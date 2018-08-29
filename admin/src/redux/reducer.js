import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import errorReducer, { moduleName as errorModule } from '../ducks/error'

export default combineReducers({
  [authModule]: authReducer,
  [errorModule]: errorReducer,
  form
})
