import firebase from 'firebase/app'
import 'firebase/auth'

export const appName = 'adv-react-timmy'

const fbConfig = {
  apiKey: 'AIzaSyAfMnUMpHhF8WBQbc6RX-YYc6chTLShguY',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '922060591753'
}

firebase.initializeApp(fbConfig)
