import firebase from 'firebase/app'
import 'firebase/auth'

export const appName = 'adv-react-23-08-da9ac'

const fbConfig = {
  apiKey: 'AIzaSyARk3JUMpCC2j2UABYNzV9Y40_9VqHiq4I',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '17730156966'
}

firebase.initializeApp(fbConfig)
