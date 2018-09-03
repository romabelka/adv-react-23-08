export function generateId() {
  return Date.now() + Math.random()
}

function getEventsData(data) {
  return new Promise((res) => {
    data.on('value', (snapshot) => res(snapshot.val()))
  })
}

export async function getEventsFromDB(rawEvents) {
  return await getEventsData(rawEvents)
}
