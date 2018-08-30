import React from 'react';

const Submit = ({ text, onSubmit }) => (
	<button
		type={'button'}
		onClick={onSubmit}
	>
		{text}
	</button>
);

export default Submit