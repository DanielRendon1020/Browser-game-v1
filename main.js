const holes = document.querySelectorAll('.add-tag')
const tags = ['<html>', '<head>', '<body>', '<h1>', '<span>', '<script>', '<link>', '<div>', '<h2>', '<button>', '<title>', '<p>', '<h4>', '<img>', '<a>']
const newTag = tags[Math.floor(Math.random() * tags.length)]

console.log(holes)

function randomHole(){
	holes.forEach(hole => {
		hole.textContent = ''
	})

	let newHole = holes[Math.floor(Math.random() * 9)]
	newHole.textContent = newTag
	console.log(newHole)
}

randomHole()