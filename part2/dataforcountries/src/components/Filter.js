import React from 'react'

const Filter = (props) => {
	return (
		<div>
			find countries<input
				value={props.filter}
				onChange={(event) => props.setFilter(event.target.value)}
			/>
		</div>
	)
}

export default Filter
