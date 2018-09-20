import {observable, action} from 'mobx'
import firebase from 'firebase/app'
import { fbToEntities } from './utils'

class PeopleStore {
    @observable people = null
    @observable loading = false

    @action setPeople(people) {
      this.people = people
    }
    
    @action setLoading() {
      this.loading = true
    }
    
    @action removeLoading() {
      this.loading = false
    }

    @action async loadPeople() {
      this.setLoading()
      const ref = firebase.database().ref('people');
      const snapshot = await ref.once('value');
      const people = fbToEntities(snapshot.val());
      this.setPeople(people);
      this.removeLoading()
    }
}

export default PeopleStore