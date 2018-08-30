import React, { Component } from 'react'
import { connect } from 'react-redux'

class Profile extends Component {
  static propTypes = {}

  render() {
    const { currentUser } = this.props
    console.log(currentUser)
    return (
      <div>
        <br/>
        <br/>
        {currentUser ? Object.keys(currentUser).filter(item => item !== 'id').map(key => (
          <div key={key}>
            {key}: {currentUser[key].toString()}
          </div>
        )): null}
      </div>
    )
  }
}

export default connect(
  ({ auth, user }) => {
    const userInfo = auth.toJS().user
    const currentUser = user.toArray().find(item => item.email === userInfo.email)
    return { currentUser }
  },
  null
)(Profile)
