import { handleActions } from 'redux-actions'

import { userAdd } from '../actions'

import { InitialState } from './constants'

export default handleActions(
  {
    [userAdd]: (state, { payload }) => state.push(payload)
  },
  InitialState
)
