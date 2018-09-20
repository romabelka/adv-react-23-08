import {observable, action, computed} from 'mobx'
import {validate} from 'email-validator'
import firebase from 'firebase/app';

class AuthStore {
    @observable email = '';
    @observable password = '';
    @observable user = {};
    
    constructor(navigation) {
        this.navigation = navigation;
    }

    @computed get isValidEmail() {
        return validate(this.email)
    };

    @action changeEmail = email => {
        this.email = email
    };

    @action changePassword = password => this.password = password

    @action signIn = () => {
        firebase.auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(this.authSuccess, this.authError);
    };

    @action.bound authSuccess = (user) => {
        this.user = user;
        this.navigation.goTo('eventList');
    };

    @action.bound authError = (err) => {
       console.info(err);
    };
}

export default AuthStore