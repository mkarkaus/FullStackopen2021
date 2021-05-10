import React from 'react'

const Filter = (props) => 
	<div>
		filter shown with<input
		value={props.filter}
		onChange={(event) => props.setFilter(event.target.value)}
		/>
	</div>

export default Filter
