import React from 'react'

const PeopleList = ({ items }) =>
  (items.size && (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, key) => (
          <tr key={key}>
            <td>
              {item.get('firstName')} {item.get('lastName')}
            </td>
            <th>{item.get('email')}</th>
          </tr>
        ))}
      </tbody>
    </table>
  )) ||
  null

export default PeopleList
