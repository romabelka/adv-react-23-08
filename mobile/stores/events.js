import { observable, action, computed, runInAction, toJS } from 'mobx'
import firebase from 'firebase/app'

import { eventsToSectionList } from '../utils'

class EventsStore {
  @observable
  entities = null

  @observable
  loading = false

  @observable
  error = null

  @computed
  get sectionList() {
    if (!this.entities) return null

    return eventsToSectionList(toJS(this.entities))
  }

  @action
  fetchAll = async () => {
    if (this.loading) return
    const peopleRef = firebase.database().ref('events')

    this.loading = true
    try {
      const data = await peopleRef.once('value')
      runInAction(() => {
        this.entities = data.val()
        this.error = null
      })
    } catch (error) {
      runInAction(() => (this.error = error))
    } finally {
      runInAction(() => (this.loading = false))
    }
  }
}

export default EventsStore
