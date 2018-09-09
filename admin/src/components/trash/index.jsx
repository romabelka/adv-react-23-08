import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { removePerson } from '../../ducks/people'
import { DropTarget } from 'react-dnd'
import { removeEvent } from '../../ducks/events'

function Trash({ connectDropTarget, hovered, canDrop }) {
	const backgroundColor = canDrop ? (hovered ? 'red' : 'lightred') : 'wheat'
	return connectDropTarget(
		<div
			style={{
				background: canDrop ? (hovered ? 'red' : 'lightred') : 'wheat',
				border: '1px solid black',
				width: 100, height: 100,
				position: 'fixed',
				top: 0, right: 0
		}}
		>
		{canDrop ? 'Drop to trash' : 'Trash'}
</div>
)
}
const spec = {
	drop(props, monitor) {
		const type = monitor.getItemType()
		const { id } = monitor.getItem()
		console.log('type', type)

		props.removeEvent(id)
	}
}

const collect = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	hovered: monitor.isOver(),
	canDrop: monitor.canDrop()
})
export default connect(
	null,
	{ removeEvent }
)(DropTarget(['event'], spec, collect)(Trash))