import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
	const [found, setFound] = useState([])
	const [countries, setCountries] = useState([])
	const [filter, setFilter] = useState('')

	useEffect(() => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				setCountries(response.data)
			})
	}, [])

	useEffect(() => {
		const filtered = countries.filter(country => 
			country.name.toLowerCase() === filter.toLowerCase())
		if (filtered.length === 1)
			setFound(filtered)
		else
			setFound(countries.filter(country => 
				country.name
				.toLowerCase()
				.includes(filter.toLowerCase())
			))
	}, [filter, countries])

	return (
		<div>
			<Filter filter={filter} setFilter={setFilter} />
			<Countries found={found} filter={filter} setFound={setFound} />
		</div>
	);
}

export default App;
