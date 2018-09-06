import reducer, {
  FETCH_EVENTS,
  ReducerRecord,
  fetchEventsSuccess,
  fetchEvents
} from './events'

describe('Events fetchEvents', () => {
  it('should insert indices at given position', () => {
    const indices = [2, 3, 4, 5]
    const events = {
      2: { id: 12 },
      3: { id: 13 },
      4: { id: 14 },
      5: { id: 15 }
    }
    const action = fetchEventsSuccess(indices, events, 2, 5)
    const currentReducer = reducer(new ReducerRecord(), action)
    expect(currentReducer.get('indices').toArray()).toEqual([
      undefined,
      undefined,
      ...indices
    ])
  })
})
