import {observable, action} from 'mobx'
import firebase from 'firebase/app'
import _ from 'lodash'
class EventsStore {
  @observable isLoaded = false
  @observable isLoading = false
  @observable eventList = []

  @action fetchEventsList = () => {
    this.changeIsLoading(true)
    return firebase.database().ref('events').once('value').then((res) => {
      this.changeEventsList(_.values(res.val()))
      this.changeIsLoading(false)
      this.changeIsLoaded(true)
    })
  }

  @action changeEventsList = (events) => this.eventList = events
  @action changeIsLoaded = (isLoaded) => this.isLoaded = isLoaded
  @action changeIsLoading = (isLoading) => this.isLoading = isLoading
}

export default EventsStore