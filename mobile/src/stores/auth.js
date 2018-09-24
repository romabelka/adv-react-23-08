import { observable, action, autorun } from 'mobx'
import firebase from 'firebase/app'
import BasicStore from './basic-store'

class AuthStore extends BasicStore {
  @observable
  email = ''
  @observable
  password = ''
  @observable
  user = null

  @action
  setEmail = (email) => (this.email = email)
  @action
  setPassword = (password) => (this.password = password)
  @action
  setUser = (user) => {
    this.user = user
    autorun(() => {
      const userPerson = this.getStore('people').list.find(
        (user) => user.email === this.user.email
      )
      if (userPerson) {
        this.user.id = userPerson.id
      }
    })
  }

  constructor(...args) {
    super(...args)
    firebase.auth().onAuthStateChanged(this.setUser)
  }

  signIn = () => {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
  }

  uploadAvatar = (avatar) => {
    const ref = firebase
      .storage()
      .ref()
      .child(`users/${this.user.id}/avatar.jpg`)

    ref
      .putString(`data:image/jpeg;base64,${avatar.base64}`, 'data_url', {
        contentType: 'image/jpeg',
        contentEncoding: 'UTF-8'
      })
      .then(
        (snapshot) => {
          // TODO: handle success
        },
        (error) => {
          // TODO: handle error
        }
      )
  }
}

export default AuthStore
