import React from "react";

import Item from './components/Item';

const Items = ({ items }) => (
	<div>
		{Object.keys(items).map((item, i) => (
			<Item
				key={i}
				{...items[item]}
			/>
		))}
	</div>
);

export default Items