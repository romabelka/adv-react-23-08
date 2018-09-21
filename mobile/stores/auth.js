import { observable, action, computed, runInAction } from 'mobx'
import { validate } from 'email-validator'
import firebase from 'firebase/app'

class AuthStore {
  @observable
  email = ''

  @observable
  password = ''

  @observable
  pending = false

  @observable
  user = null

  @observable
  error = null

  @computed
  get isValidEmail() {
    return validate(this.email)
  }

  @computed
  get isAuthorized() {
    return !!this.user
  }

  @action
  changeEmail = (email) => (this.email = email)

  @action
  changePassword = (password) => (this.password = password)

  @action
  signIn = async () => {
    if (!this.password || !this.isValidEmail) return
    if (this.pending) return

    const auth = firebase.auth()
    this.pending = true

    try {
      const user = await auth.signInWithEmailAndPassword(
        this.email,
        this.password
      )
      runInAction(() => {
        this.user = user
        this.error = null
      })
    } catch (error) {
      runInAction(() => {
        this.error = error
      })
    } finally {
      runInAction(() => (this.pending = false))
    }
  }
}

export default AuthStore
