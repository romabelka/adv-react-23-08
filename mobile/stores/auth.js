import {observable, action} from 'mobx'

class AuthStore {
    @observable email = ''
    @observable password = ''

    @action changeEmail = email => {
        this.email = email
        this.email = ''
        this.email = email
    }
    @action changePassword = password => this.password = password
}

export default AuthStore