import React, { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import Persons from './components/Persons.js'
import PersonForm from './components/PersonForm.js'
import axios from 'axios'

const App = () => {
	const [ persons, setPersons ] = useState([])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ filter, setFilter ] = useState('')

	useEffect(() => axios
			.get('http://localhost:3001/persons')
			.then(response => 
				setPersons(response.data))
	, [])

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

	const handleNewName = (event) => setNewName(event.target.value)
	const handleNewNumber = (event) => setNewNumber(event.target.value)

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} setFilter={setFilter} />
			<h3>add a new</h3>
			<PersonForm handleNewPerson={addPerson}
				handleNewName={handleNewName}
				handleNewNumber={handleNewNumber}
				newName={newName}
				newNumber={newNumber}
			/>
			<h3>Numbers</h3>
			<Persons persons={persons} filter={filter} />
		</div>
	)
}

export default App
