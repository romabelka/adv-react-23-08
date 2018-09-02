import {
  getEventsSaga,
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_ERROR
} from './events'

import { fetchData } from './utils'
import { call, put } from 'redux-saga/effects'
import { SIGN_UP_ERROR } from './auth'

describe('Events saga', () => {
  it('should fetch events from db', () => {
    const events = [
      {
        title: 'Agent Conf',
        url: 'http://www.agent.sh/',
        where: 'Dornbirn, Austria',
        when: 'January 20-21, 2017',
        month: 'January',
        submissionDeadline: ''
      },
      {
        title: "O'Reilly Velocity Conference",
        url: 'http://conferences.oreilly.com/velocity/vl-ca',
        where: 'San Jose, CA',
        when: 'January 19-22, 2017',
        month: 'January',
        submissionDeadline: ''
      }
    ]

    const action = { type: GET_EVENTS_REQUEST }
    const process = getEventsSaga(action)

    expect(process.next().value).toEqual(call(fetchData, 'events'))
    expect(process.next(events).value).toEqual(
      put({
        type: GET_EVENTS_SUCCESS,
        payload: { events }
      })
    )
    expect(process.next().done).toBe(true)
  })

  it('should return error', () => {
    const action = { type: GET_EVENTS_REQUEST }
    const process = getEventsSaga(action)
    const error = { message: 'some error' }

    process.next()
    expect(process.throw(error).value).toEqual(
      put({
        type: GET_EVENTS_ERROR,
        payload: { error: error.message }
      })
    )
    expect(process.next().done).toBe(true)
  })
})
