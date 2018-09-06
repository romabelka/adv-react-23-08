import { OrderedMap } from 'immutable'

export function generateId() {
  return Date.now() + Math.random()
}

export function fbToEntities(values, DataRecord) {
  return new OrderedMap(
    Object.entries(values).map(([id, value]) => [
      id,
      new DataRecord({ id, ...value })
    ])
  )
}

export const getLastId = (obj) => {
  const keys = Object.keys(obj)

  return keys[keys.length - 1]
}
