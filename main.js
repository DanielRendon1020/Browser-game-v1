const holes = document.querySelectorAll('.hole')
// const tags = ['<html>', '<head>', '<body>', '<h1>', '<span>', '<script>', '<link>', '<div>', '<h2>', '<button>', '<title>', '<p>', '<h4>', '<img>', '<a>']
// const newTag = tags[Math.floor(Math.random() * tags.length)]
const tag = document.querySelector('.addTag')

function randomHole(){
	holes.forEach(hole => {
		hole.classList.remove('tag')
	})

	let newHole = holes[Math.floor(Math.random() * 9)]
	

}

randomHole()