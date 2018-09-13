import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const appName = 'adv-react-53b1c'

const fbConfig = {
  apiKey: 'AIzaSyBMgo5tCsH2-DZqULliABpR0qxgXmVecdc',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '1010171927497'
}

window.firebase = firebase.initializeApp(fbConfig)
