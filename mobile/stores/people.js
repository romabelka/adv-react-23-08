import {action, autorun, observable, runInAction} from 'mobx'
import firebase from 'firebase/app'

class PeopleStore {
    @observable loading = false
    @observable error = null
    @observable entities = []

    constructor ({auth}) {
        autorun(() => {
            if(auth.isAuthorized) this.fetch();
        })
    }
    @action fetch = () => {
        this.loading = true;
        firebase.database().ref('people').once('value').then(snapshot => {
            runInAction(()=> {
                console.log('success', snapshot)

                this.loading = false;
                this.entities =  Object.entries(snapshot.val()).map(([id, value]) => ({id, ...value}));
            })
        }).catch(error => {
            runInAction(() => {
                this.loading = false;
                this.error = error.message
            })
        })
    }
}
export default PeopleStore
