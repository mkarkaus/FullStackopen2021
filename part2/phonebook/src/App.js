import React, { useState } from 'react'

const Person = (props) => <div>{props.name} {props.number}</div>

const App = () => {
	const [persons, setPersons] = useState([
		{
			name: 'Arto Hellas',
			number: '040-1234567'
		}
	]) 
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')

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
					<Person key={person.name} name={person.name} number={person.number} />
				)}
			</div>
		</div>
	)
}

export default App