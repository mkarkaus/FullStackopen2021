import React, { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => {
	return (
		<button onClick={() => handleClick()}>
			{text}
		</button>
	)
}

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
	]

	const [selected, setSelected] = useState(0)
	const [most, setMost] = useState(0)
	const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))

	const vote = () => {
		const copy = [...points]

		copy[selected] += 1
		if (Math.max(...copy) === copy[selected])
			setMost(selected)
		setPoints(copy)
	}

	const next = () => setSelected(Math.floor(Math.random() * anecdotes.length))

	return (
		<div>
			<Header text='Anecdote of the day' />
			<div>
				{anecdotes[selected]}
			</div>
			<div>
				has {points[selected]} votes
			</div>
			<Button handleClick={vote} text ='vote' />
			<Button handleClick={next} text ='next anecdote'/>
			<Header text='Anecdote with most votes' />
			<div>
				{anecdotes[most]}
			</div>
			<div>
				has {points[most]} votes
			</div>
		</div>
	)
}

export default App