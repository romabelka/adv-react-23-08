import React from 'react'

import Item from './Item'

const EventsListComponent = ({ events }) => (
  <div>
    {Object.keys(events).map((item, i) => (
      <Item key={i} {...events[item]} />
    ))}
  </div>
)

export default EventsListComponent
