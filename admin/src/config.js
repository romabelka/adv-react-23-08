import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const appName = 'adv-react-23-08'

const fbConfig = {
  apiKey: 'AIzaSyCgw2wKSWCuWBy3ZSqvn5O3Q7mq1wf21ug',
  authDomain: 'adv-react-23-08-vittorius.firebaseapp.com',
  databaseURL: 'https://adv-react-23-08-vittorius.firebaseio.com',
  projectId: 'adv-react-23-08-vittorius',
  storageBucket: 'adv-react-23-08-vittorius.appspot.com',
  messagingSenderId: '999406358227'
}

firebase.initializeApp(fbConfig)

export const db = firebase.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)
