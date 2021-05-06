import React, { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Statistic = ({ name, value }) => {
	return (
		<tr>
			<td>{name}</td>
			<td>{value}</td>
		</tr>
	)
}

const Statistics = (props) => {
	const good = props.good
	const neutral = props.neutral
	const bad = props.bad

	const average = (good, neutral, bad) => (good + (bad * -1)) / (good + neutral + bad)
	const positive = (good, all) => (good * 100 / all) + ' %'

	if (good + neutral + bad === 0)
		return (<p>No feedback given</p>)
	return (
		<table>
			<tbody>
				<Statistic name='good' value={good} />
				<Statistic name='neutral' value={neutral} />
				<Statistic name='bad' value={bad} />
				<Statistic name='all' value={good + neutral + bad} />
				<Statistic name='average' value={average(good, neutral, bad)} />
				<Statistic name='positive' value={positive(good, good + neutral + bad)} />
			</tbody>
		</table>
	)
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

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
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

export default App