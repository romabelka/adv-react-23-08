import {observable, action} from 'mobx'
import firebase from 'firebase/app'
import { fbToEntities } from './utils'

class EventsStore {
    @observable events = null
    @observable loading = false

    @action setEvents(events) {
      this.events = events
    }
    
    @action setLoading() {
      this.loading = true
    }
    
    @action removeLoading() {
      this.loading = false
    }

    @action async loadEvents() {
      this.setLoading()
      const ref = firebase.database().ref('events');
      const snapshot = await ref.once('value');
      const events = fbToEntities(snapshot.val());
      this.setEvents(events);
      this.removeLoading()
    }
}

export default EventsStore