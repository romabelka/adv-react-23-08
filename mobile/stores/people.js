import { observable, action, runInAction, computed } from 'mobx'
import firebase from 'firebase/app'
import { peopleToSectionList } from '../utils'

class PeopleStore {
  @observable
  entities = null

  @observable
  loading = false

  @observable
  error = null

  @computed
  get sectionList() {
    if (!this.entities) return null

    return peopleToSectionList(this.entities)
  }

  @action
  fetchAll = async () => {
    if (this.loading) return
    const peopleRef = firebase.database().ref('people')

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

export default PeopleStore
