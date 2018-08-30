import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import adminReducer, {
  moduleName as adminModule,
  ADD_PERSON_SUCCESS
} from '../ducks/admin'

export default combineReducers({
  [authModule]: authReducer,
  [adminModule]: adminReducer,
  form: form.plugin({
    admin: (state, action) => {
      switch (action.type) {
        case ADD_PERSON_SUCCESS:
          return {
            ...state,
            values: {
              ...state.values,
              firstName: '',
              lastName: '',
              email: ''
            },
            registeredFields: {
              ...state.registeredFields
            }
          }
        default:
          return state
      }
    }
  })
})
