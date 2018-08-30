import firebase from 'firebase/app'
import 'firebase/auth'

export const appName = 'adv-react-23-08'

const fbConfig = {
  apiKey: 'AIzaSyDtTcf5Ps1O-MEUB-H_9XMU-cc-1eQDjTk',
  authDomain: 'advreact-162ac.firebaseapp.com',
  databaseURL: 'https://advreact-162ac.firebaseio.com',
  projectId: 'advreact-162ac',
  storageBucket: 'advreact-162ac.appspot.com',
  messagingSenderId: '1072802030604'
}

firebase.initializeApp(fbConfig)
