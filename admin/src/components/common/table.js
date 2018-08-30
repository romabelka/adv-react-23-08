import React, { Component } from 'react'
import { USER_COLUMNS } from '../../ducks/admin'

class Table extends Component {
  render() {
    return (
      <div>
        <table border="1" cellpadding="5" cellspacing="5">
          <tr>
            {Object.keys(USER_COLUMNS).map((h) => {
              return <th>{USER_COLUMNS[h]}</th>
            })}
          </tr>
          {this.props.data.map((i) => {
            return (
              <tr>
                {Object.keys(USER_COLUMNS).map((x) => {
                  return <td>{i[x]}</td>
                })}
              </tr>
            )
          })}
        </table>
      </div>
    )
  }
}

export default Table
