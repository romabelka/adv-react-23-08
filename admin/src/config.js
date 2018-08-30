import firebase from 'firebase/app'
import 'firebase/auth'

export const appName = 'reactlearning-efe18'

const fbConfig = {
  apiKey: 'AIzaSyCqtP01dutS6O573HyenLDKSzd8qk25Q7I',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '1012742041994'
}

firebase.initializeApp(fbConfig)
