import React, { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import Notification from './components/Notification.js'
import Persons from './components/Persons.js'
import PersonForm from './components/PersonForm.js'
import personService from './services/persons'

const App = () => {
	const [ persons, setPersons ] = useState([])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ filter, setFilter ] = useState('')
	const [ notifMessage, setNotifMessage ] = useState(null)

	useEffect(() => 
		personService
			.getAll()
			.then(InitialPersons =>
				setPersons(InitialPersons))
	, [])

	const addPerson = (event) => {
		event.preventDefault()
		const personObject = {
			name: newName,
			number: newNumber
		}
		if (persons.some(person => person.name === newName))
		{
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
			{
				personService
					.change(personObject, persons.find(person => person.name === newName).id)
					.then(() => 
						setPersons(persons.map(person =>
							(person.name === newName)
							? personObject
							: person
						)))
				setNotifMessage(`The number of ${newName} has been changed`)
				setTimeout(() => {
					setNotifMessage(null)
				}, 2000)
			}
		}
		else
		{
			personService
			.create(personObject)
			.then(returnedNote => 
				setPersons(persons.concat(returnedNote))
			)
			setNotifMessage(`Added ${newName}`)
			setTimeout(() => {
				setNotifMessage(null)
			}, 2000)
		}
		setNewName('')
		setNewNumber('')
	}

	const removePerson = (event, id) => {
		event.preventDefault()
		if (window.confirm(`Delete ${persons.find(temp => temp.id === id).name}?`) === true)
		{
			personService
				.remove(id)
				.then(() => 
					setPersons(persons.filter(temp => temp.id !== id))
				)
		}
	}

	const handleNewName = (event) => setNewName(event.target.value)
	const handleNewNumber = (event) => setNewNumber(event.target.value)

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={notifMessage} />
			<Filter filter={filter} setFilter={setFilter} />
			<h3>add a new</h3>
			<PersonForm handleNewPerson={addPerson}
				handleNewName={handleNewName}
				handleNewNumber={handleNewNumber}
				newName={newName}
				newNumber={newNumber}
			/>
			<h3>Numbers</h3>
			<Persons persons={persons}
				filter={filter}
				handleRemovePerson={removePerson}
			/>
		</div>
	)
}

export default App
