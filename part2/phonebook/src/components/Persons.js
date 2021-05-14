import React from 'react'

const Person = (props) => 
	<div>
		{props.name} {props.number}
		<button onClick={(event) => props.handleRemovePerson(event, props.id)}>
			Delete
		</button>
	</div>

const Persons = (props) =>
	<div>
		{props.persons.map(person => 
			person.name.toLowerCase().includes(props.filter.toLowerCase())
				? <Person key={person.id}
						id={person.id}
						name={person.name}
						number={person.number}
						handleRemovePerson={props.handleRemovePerson}
					/>
				: null
		)}
	</div>

export default Persons
