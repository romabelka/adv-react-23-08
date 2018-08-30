import { createActions } from 'redux-actions'

export const { userAdd } = createActions('USER_ADD', { prefix: '@@user' })
