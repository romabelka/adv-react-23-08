import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import peopleReducer, {
  cleanForm,
  moduleName as peopleModule
} from '../ducks/people'

export default combineReducers({
  [authModule]: authReducer,
  [peopleModule]: peopleReducer,
  form: form.plugin(cleanForm)
})
