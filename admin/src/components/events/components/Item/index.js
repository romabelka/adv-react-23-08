import React from 'react'

const EventsItem = ({ url, title, where, when, month }) => (
  <div>
    <a href={url} target="_blank">
      {title}
    </a>
    <div>{where}</div>
    <div>{when}</div>
    <div>{month}</div>
  </div>
)

export default EventsItem
