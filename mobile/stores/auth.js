import {observable, action, computed, createAtom} from 'mobx'
import {validate} from 'email-validator'
import firebase from 'firebase/app'

class AuthStore {
    @observable email = ''
    @observable password = ''
    @observable user = null
    @observable signInError = false
    @observable atom = createAtom(
      'AuthStore',
      () => firebase.auth().onAuthStateChanged((user) => console.log('user'))
    )

    @computed get isValidEmail() {
        return validate(this.email)
    }
    
    @computed get isSignInAvailable() {
      return this.isValidEmail && this.password
    }

    @action changeEmail = email => {
        this.email = email
        this.email = ''
        this.email = email
    }
    @action changePassword = password => this.password = password
    @action setUser = user => this.user = user
    @action async signIn() {
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        return user
      } catch(e) {
        this.setError()
      }
    }
    @action setError() {
      this.signInError = true
    }
}

export default AuthStore