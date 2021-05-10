import React, { useState } from 'react'

const Person = ({ name }) => <div>{name}</div>

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	]) 
	const [ newName, setNewName ] = useState('')

	const addPerson = (event) => {
		event.preventDefault()

		setPersons(persons.concat({ name: newName }))
		setNewName('')
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
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{persons.map(person => 
					<Person key={person.name} name={person.name} />
				)}
			</div>
		</div>
	)
}

export default App