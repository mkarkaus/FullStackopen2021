import React, { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Stats = ({ text, state }) => <p>{text} {state}</p>

const Button = ({ handleClick, text }) => {
	
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	)
}

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const give = 'give feedback'
	const stats = 'statistics'

	const average = (good, neutral, bad) => {
		if (good + neutral + bad === 0)
			return (0)
		return (
			((good * 1) + (neutral * 0) + (bad * -1)) / (good + neutral + bad)
		)
	}

	const positive = (good, all) => {
		if (all === 0)
			return ('0 %')
		return (
			(good * 100 / all) + ' %'
		)
	}

	return (
		<div>
			<Header text={give} />
			<Button handleClick={() => setGood(good + 1)} text="good" />
			<Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
			<Button handleClick={() => setBad(bad + 1)} text="bad" />
			<Header text={stats} />
			<Stats text="good" state={good} />
			<Stats text="neutral" state={neutral} />
			<Stats text="bad" state={bad} />
			<Stats text="all" state={good + neutral + bad} />
			<Stats text="average" state={average(good, neutral, bad)} />
			<Stats text="positive" state={positive(good, good + neutral + bad)} />
		</div>
	)
}

export default App