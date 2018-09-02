import firebase from 'firebase/app'

export function generateId() {
  return Date.now() + Math.random()
}

export function fetchData(endpoint) {
  return firebase
    .database()
    .ref(endpoint)
    .once('value')
    .then((snapshot) => snapshot.val())
}
