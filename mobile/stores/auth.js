import {observable, action, computed} from 'mobx'
import {validate} from 'email-validator'
import firebase from 'firebase/app'

class AuthStore {
    @observable email = ''
    @observable password = ''
    @observable user = ''

    @computed get isValidEmail() {
        return validate(this.email)
    }

    @action changeEmail = email => {
        this.email = email
        this.email = ''
        this.email = email
    }

    signInIntoFb = () => {
      return firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    }

    @action changeUser = user => this.user = user
    @action changePassword = password => this.password = password
}

export default AuthStore