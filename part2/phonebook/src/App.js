import React, { useState } from 'react'

const Person = (props) => <div>{props.name} {props.number}</div>

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ filter, setFilter ] = useState('')

	const addPerson = (event) => {
		event.preventDefault()
		if (persons.some(person => person.name === newName))
			alert(`${newName} is already added to phonebook`)
		else
			setPersons(persons.concat({
				name: newName,
				number: newNumber
			}))
		setNewName('')
		setNewNumber('')
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with<input
					value={filter}
					onChange={(event) => setFilter(event.target.value)}
				/>
			</div>
			<h2>add a new</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input
						value={newName}
						onChange={(event) => setNewName(event.target.value)}
					/>
				</div>
				<div>
					number: <input
						value={newNumber}
						onChange={(event) => setNewNumber(event.target.value)}
					/>
				</div>
				<div><button type="submit">add</button></div>
			</form>
			<h2>Numbers</h2>
			<div>
				{persons.map(person => 
					person.name.toLowerCase().includes(filter.toLowerCase())
						? <Person key={person.name} name={person.name} number={person.number} />
						: null
				)}
			</div>
		</div>
	)
}

export default App