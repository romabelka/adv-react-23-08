export function generateId() {
  return Date.now() + Math.random()
}
export const createAsyncAction = (type) => ({
  REQUEST: `${type}.REQUEST`,
  SUCCESS: `${type}.SUCCESS`,
  FAILURE: `${type}.FAILURE`
})
