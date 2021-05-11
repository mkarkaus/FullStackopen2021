import React from 'react'

const AdditionalInfo = ({ country }) => 
	<div>
		<h2>{country.name}</h2>
		<div>capital {country.capital}</div>
		<div>population {country.population}</div>
		<h3>languages</h3>
		<ul>
			{country.languages.map((language) =>
				<li key={language.name} >{language.name}</li>
			)}
		</ul>
		<img src={country.flag}
			alt="Country flag"
			height="100px"
			border="2px solid black"
		/>
	</div>

const Country = ({ country, setFound }) => 
	<div>
		{country.name}
		<button onClick={() => setFound([country])}>
			show
		</button>
	</div>

const Countries = ({ found, filter, setFound }) => {
	if (found.length > 10)
		return (<div>Too many matches, specify another filter</div>)
	else if (found.length === 1)
		return (<AdditionalInfo country={found[0]} />)
	return (
		<div>
			{found.map(country => 
				country.name.toLowerCase().includes(filter.toLowerCase())
				? <Country key={country.name} country={country} setFound={setFound} />
				: null
			)}
		</div>
	)
}

export default Countries
