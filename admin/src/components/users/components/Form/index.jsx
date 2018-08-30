import React, { Component } from "react";

import Input from '../../../common/Inputs';
import Submit from '../../../common/Submit';
import { USER_DATA } from './constants';

class Form extends Component {
	constructor(props) {
		super(props);

		this.state = USER_DATA;
	}

	changeFName = (e) => {
		this.setState({ fname: e.target.value });
	};
	changeLName = (e) => {
		this.setState({ lname: e.target.value });
	};
	changeEmail = (e) => {
		this.setState({ email: e.target.value });
	};

	onSubmit = () => {
		this.setState(USER_DATA);
		this.props.onSubmit(this.state);
	};

	render() {
		const { fname, lname, email } = this.state;

		return (
			<div>
				<Input name="fname" onInput={this.changeFName} value={fname} />
				<Input name="lname" onInput={this.changeLName} value={lname} />
				<Input name="email" onInput={this.changeEmail} value={email} />
				<Submit text={'submit'} onSubmit={this.onSubmit} />
			</div>
		)
	}
}

export default Form;