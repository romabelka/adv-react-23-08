import React from 'react'

const renderRow = ({ id, title, url, when, where }) => (
  <tr key={id}>
    <td>{url ? <a href={url}>{title}</a> : title}</td>
    <td>{when}</td>
    <td>{where}</td>
  </tr>
)

export default ({ data }) => {
  if (!data.length) {
    return <div>No events</div>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>When</th>
          <th>Where</th>
        </tr>
      </thead>
      <tbody>{data.map(renderRow)}</tbody>
    </table>
  )
}
