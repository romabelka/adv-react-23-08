import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getUsers, createUser } from '../ducks/users';
import UserForm from '../components/Users/UserForm';
import UsersList from '../components/Users/UsersList';

class Users extends Component {
  render() {
    const {
      users,
      actions: { createUser },
    } = this.props;

    return (
      <section>
        <h3>Users</h3>
        <UserForm onSubmit={createUser} />
        <UsersList users={users} />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  users: getUsers(state),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      createUser,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
