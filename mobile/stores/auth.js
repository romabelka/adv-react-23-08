import { observable, action, computed } from 'mobx'
import { validate } from 'email-validator'
import firebase from 'firebase/app'

class AuthStore {
  @observable
  email = ''
  @observable
  password = ''
  @observable
  loadingNewState = true
  @observable
  user = null
  onAuthStateChangedDisposer = null

  constructor() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
  }

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
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
  }
}

export default AuthStore
