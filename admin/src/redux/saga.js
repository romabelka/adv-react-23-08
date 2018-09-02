import { all } from 'redux-saga/effects'
import { saga as authSaga } from '../ducks/auth'
import { saga as peopleSaga } from '../ducks/people'
import { saga as eventSaga } from '../ducks/event'

export default function*() {
  yield all([authSaga(), peopleSaga(), eventSaga()])
}
