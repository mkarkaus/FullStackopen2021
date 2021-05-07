import React from 'react';

const Header = ({ course }) => <h1>{course.name}</h1>

const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Content = ({ course }) => (
		<div>
			{course.parts.map(part => 
				<Part key={part.id} part={part} />
			)}
		</div>
)

const Total = ({ course }) => (
		<h3>
			total of {course.parts.reduce((total, part) =>
				total + part.exercises, 0)} exercises
		</h3>
)

const Course = ({ course }) => (
		<div>
			<Header course={course} />
			<Content course={course} />
			<Total course={course} />
		</div>
)

const App = () => {
	const course = {
		id: 1,
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10,
				id: 1
			},
			{
				name: 'Using props to pass data',
				exercises: 7,
				id: 2
			},
			{
				name: 'State of a component',
				exercises: 14,
				id: 3
			},
			{
				name: 'Redux',
				exercises: 11,
				id: 4
			}
		]
	}

	return <Course course={course} />
}

export default App;
