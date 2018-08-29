import firebase from 'firebase/app'
import 'firebase/auth'

export const appName = 'adv-react-23-08-vittorius'

const fbConfig = {
  apiKey: 'AIzaSyCgw2wKSWCuWBy3ZSqvn5O3Q7mq1wf21ug',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: `${appName}`,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '999406358227'
}

firebase.initializeApp(fbConfig)
