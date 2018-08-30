import firebase from 'firebase/app'
import 'firebase/auth'

export const appName = 'adv-react-6fc9a'

const fbConfig = {
  apiKey: 'AIzaSyAJiE6RMMX1iCLCY9YbRAhn6i5wp_4k1QU',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '398253872891'
}

firebase.initializeApp(fbConfig)
