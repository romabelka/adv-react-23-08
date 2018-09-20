import {action, autorun, computed, observable, runInAction} from 'mobx'
import firebase from 'firebase/app'

class EventsStore {
    @observable loading = false
    @observable error = null
    @observable entities = []

    constructor ({auth}) {
        autorun(() => {
            if(auth.isAuthorized) this.fetch();
        })
    }

    getById = id => {
        const result = this.entities.filter (items => items.id === id)
        return result.length > 0 ? result[0]: null;
    }

    @action fetch = () => {
        this.loading = true;
        firebase.database().ref('events').once('value').then(snapshot => {
            runInAction(()=> {
                console.log('success')
                this.loading = false;
                this.entities =  Object.entries(snapshot.val()).map(([id, value]) => ({id, ...value}));
                console.log(this.entities);
            })
        }).catch(error => {
            runInAction(() => {
                this.loading = false;
                this.error = error.message
            })
        })
    }
}
export default EventsStore