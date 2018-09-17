import {autorun} from 'mobx'
import AuthStore from './auth'

const auth = new AuthStore()

autorun(() => {
    console.log(123, auth.email)
})

export default {
    auth
}