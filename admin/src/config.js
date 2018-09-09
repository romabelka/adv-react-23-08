import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const appName = 'adv-react-ann'

const fbConfig = {
  apiKey: 'AIzaSyB7qONk0R92oJKWcmxPwLZLmW2iQpzplMA',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '76071028291'
}

firebase.initializeApp(fbConfig)
