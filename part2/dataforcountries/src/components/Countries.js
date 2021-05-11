import React, { useEffect } from 'react'
import axios from 'axios'

const AdditionalInfo = ({ country, api_key, weather, setWeather }) => {
	useEffect(() => {
		axios
			.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
			.then((response) => {
				setWeather(response.data.current);
		})
	}, [api_key, country, setWeather])

	return (
		<div>
			<h2>{country.name}</h2>
			<div>capital {country.capital}</div>
			<div>population {country.population}</div>
			<h3>Spoken languages</h3>
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
			<h3>Weather in {country.capital}</h3>
			<div><b>temperature: </b>{weather.temperature} Celsius</div>
			<img src={weather.weather_icons}
				alt={weather.weather_descriptions}
				height="75px"
			/>
			<div><b>wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}</div>
		</div>
	)
}

const Country = ({ country, setFound }) => 
	<div>
		{country.name}
		<button onClick={() => setFound([country])}>
			show
		</button>
	</div>

const Countries = (props) => {
	if (props.found.length > 10)
		return (<div>Too many matches, specify another filter</div>)
	else if (props.found.length === 1)
		return (<AdditionalInfo country={props.found[0]}
								api_key={props.api_key}
								weather={props.weather}
								setWeather={props.setWeather}
				/>)
	return (
		<div>
			{props.found.map(country => 
				country.name.toLowerCase().includes(props.filter.toLowerCase())
				? <Country key={country.name}
					country={country}
					setFound={props.setFound}
					weather={props.weather}
					setWeather={props.setWeather}
				/>
				: null
			)}
		</div>
	)
}

export default Countries
