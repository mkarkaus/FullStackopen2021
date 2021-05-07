import React from 'react'

const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>
const Header = ({ course }) => <h2>{course.name}</h2>

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

export default Course
