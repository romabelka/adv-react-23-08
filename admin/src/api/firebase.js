import firebase from 'firebase/app'

const fetchEvents = () =>
  firebase
    .database()
    .ref('/events')
    .once('value')
    .then((snap) => snap.val())

export { fetchEvents }
