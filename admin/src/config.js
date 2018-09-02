import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const appName = 'adv-react-23-08-ak'

const fbConfig = {
  apiKey: 'AIzaSyCl-cn3ad9cRDcYCR5NOOTPJ_ZkKMRT-B8',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '924130919796'
}

firebase.initializeApp(fbConfig)
