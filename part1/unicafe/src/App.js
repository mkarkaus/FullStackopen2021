import React, { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Statistics = (props) => {
	const good = props.good
	const neutral = props.neutral
	const bad = props.bad
	const all = props.all
	const average = props.average
	const positive = props.positive
	
	if (good + neutral + bad === 0)
		return (<p>No feedback given</p>)
	return (
		<div>
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
			<p>all {all}</p>
			<p>average {average}</p>
			<p>positive {positive}</p>
		</div>
	)
}

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
			<Statistics good={good}
				neutral={neutral}
				bad={bad}
				all={good + neutral + bad}
				average={average(good, neutral, bad)}
				positive={positive(good, good + neutral + bad)}
			/>
		</div>
	)
}

export default App