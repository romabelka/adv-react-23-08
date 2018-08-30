import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import authReducer, { moduleName as authModule } from '../ducks/auth'
import personReducer, {
  moduleName as personModule,
  formReducer as personFormReducer
} from '../ducks/person'

export default combineReducers({
  [authModule]: authReducer,
  [personModule]: personReducer,
  form: formReducer.plugin({
    person: personFormReducer
  })
})
