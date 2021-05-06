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
		</div>
	)
}

export default App