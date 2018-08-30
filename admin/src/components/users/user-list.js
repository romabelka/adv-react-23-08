import React, { Fragment } from 'react'

export default function UserList({ users }) {
  return users.entrySeq().map(([key, value]) => (
    <Fragment key={key}>
      <div>
        {value.firstName}
        &nbsp;
        {value.lastName}
        &nbsp;(
        {value.email})
      </div>
    </Fragment>
  ))
}
