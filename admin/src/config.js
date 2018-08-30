import firebase from 'firebase/app'
import 'firebase/auth'

export const appName = 'adv-react-23-08'

const fbConfig = {
  apiKey: 'AIzaSyCOSi_RfIUvQ3EBOSyVHqEBquKckQ5-AKo',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '337108129487'
}

firebase.initializeApp(fbConfig)
