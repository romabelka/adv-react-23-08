import React from "react";

const Item = ({ fname, lname, email }) => (
	<div>
		<div>{fname}</div>
		<div>{lname}</div>
		<div>{email}</div>
	</div>
);

export default Item