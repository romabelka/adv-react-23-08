import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const appName = 'mytest-1ec05'

const fbConfig = {
  apiKey: 'AIzaSyCBZXz6f04ps-M94XCV74cfoKwk3hEZg8c',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '780758368339'
}

firebase.initializeApp(fbConfig)
export const database = firebase.database()
