import {action, autorun, computed, observable, runInAction} from 'mobx'
import {validate} from 'email-validator'
import firebase from 'firebase/app'

class AuthStore {
    @observable email = ''
    @observable password = ''
    @observable loading = false
    @observable user = null
    @observable error = null

    @computed get isValidEmail() {
        return validate(this.email)
    }
    @computed get isAuthorized () {
        return !!this.user
    }

    constructor({navigation}) {
        autorun(() => {
            console.log('auth changed',this.isAuthorized);
            if(this.isAuthorized) navigation.goTo('main');
        })
    }



    @action changeEmail = email => {
        this.email = email
        this.email = ''
        this.email = email
    }

    @action changePassword = password => this.password = password
    @action signIn = () => {
        this.loading = true;
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user => {
            runInAction(()=> {
                console.log('success')
                this.loading = false;
                this.user = user;
            })
        }).catch(error => {
            runInAction(() => {
                this.loading = false;
                this.error = error.message
            })
        })
    }


}

export default AuthStore