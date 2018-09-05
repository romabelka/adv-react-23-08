import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const appName = 'adv-react-pavelm'

const fbConfig = {
  apiKey: 'AIzaSyC3qAp9mGOiTblOz2dAmdrZdPIHcRchDXg',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '450922074614'
}

firebase.initializeApp(fbConfig)
