const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {

	const reducer = (sum, item) => {
		return sum + (item.likes ? item.likes : 0)
	}
	const total = blogs.reduce(reducer, 0)
	
	return total
}

module.exports = {
	dummy,
	totalLikes
}
