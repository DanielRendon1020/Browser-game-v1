
gsap.registerPlugin(Draggable, PixiPlugin, TextPlugin);

const holes = document.querySelectorAll('.add-tag')
const tags = ['<html>', '<head>', '<body>', '<h1>', '<span>', '<script>', '<link>', '<div>', '<h2>', '<button>', '<title>', '<p>', '<h4>', '<img>', '<a>']
const newTag = tags[Math.floor(Math.random() * tags.length)]

gsap.to("h1", {'text-shadow' : '0px 0px 8px white', yoyo: true, repeat: -1})

function start(){
	let startWindow = document.getElementById('start-window')
	let main = document.getElementById('main')
	document.getElementById('start-button').addEventListener('click', function() {
		startWindow.classList.add('d-none')
		main.style.filter = 'none'

	})

}
start()


function randomHole(){
	holes.forEach(hole => {
		hole.textContent = ''
	})

	let newHole = holes[Math.floor(Math.random() * 9)]
	newHole.textContent = newTag
	console.log(newHole)
}

randomHole()