import {observable, action, computed} from 'mobx'
import firebase from 'firebase/app'
import _ from 'lodash'

class PeopleStore {
  @observable isLoaded = false
  @observable isLoading = false
  @observable peopleList = []

  @action fetchPeopleList = () => {
    this.changeIsLoading(true)
    return firebase.database().ref('people').once('value').then((res) => {
      this.changePeopleList(_.values(res.val()))
      this.changeIsLoading(false)
      this.changeIsLoaded(true)
    })
  }

  @action changePeopleList = (people) => this.peopleList = people
  @action changeIsLoaded = (isLoaded) => this.isLoaded = isLoaded
  @action changeIsLoading = (isLoading) => this.isLoading = isLoading
}

export default PeopleStore