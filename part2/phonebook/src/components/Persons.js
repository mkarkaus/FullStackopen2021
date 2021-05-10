import React from 'react'

const Person = (props) => <div>{props.name} {props.number}</div>

const Persons = ({ persons, filter }) =>
	<div>
		{persons.map(person => 
			person.name.toLowerCase().includes(filter.toLowerCase())
				? <Person key={person.name} name={person.name} number={person.number} />
				: null
		)}
	</div>

export default Persons
