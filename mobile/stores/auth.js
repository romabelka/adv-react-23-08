import { observable, action, computed } from 'mobx'
import { validate } from 'email-validator'
import firebase from 'firebase/app'

class AuthStore {
  @observable
  email = ''
  @observable
  password = ''
  @observable
  loadingNewState = false
  @observable
  user = null
  onAuthStateChangedDisposer = null

  @computed
  get isValidEmail() {
    return validate(this.email)
  }

  @computed
  get authenticated() {
    return !!this.user
  }

  @action
  changeEmail = (email) => {
    this.email = email
    this.email = ''
    this.email = email
  }

  @action
  changePassword = (password) => (this.password = password)

  @action
  onAuthStateChanged = (user) => {
    this.loadingNewState = false
    this.user = user
  }

  @action
  signIn = () => {
    this.loadingNewState = true
    if (!this.onAuthStateChangedDisposer) {
      this.onAuthStateChangedDisposer = firebase
        .auth()
        .onAuthStateChanged(this.onAuthStateChanged)
    }
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
  }
}

export default AuthStore
