import { observable, action, computed } from 'mobx'
import { validate } from 'email-validator'

class AuthStore {
  @observable
  email = ''

  @observable
  password = ''

  @computed
  get isValidEmail() {
    return validate(this.email)
  }

  @action
  changeEmail = (email) => {
    this.email = email
    this.email = ''
    this.email = email
  }

  @action
  changePassword = (password) => (this.password = password)
}

export default AuthStore
