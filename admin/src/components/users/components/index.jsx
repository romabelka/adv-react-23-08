import React, { Component, Fragment } from "react";
import Form from './Form';
import Items from './Items';

class UsersComponent extends Component {
    render() {
    	const { users, userAdd } = this.props;

        return (
        	<Fragment>
				<Form onSubmit={userAdd} />
				<Items items={users.toJS()} />
			</Fragment>
		)
    }
}

export default UsersComponent;