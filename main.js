
const holes = document.querySelectorAll('.add-tag')
const tags = ['<html>', '<head>', '<body>', '<h1>', '<span>', '<script>', '<link>', '<div>', '<h2>', '<button>', '<title>', '<p>', '<h4>', '<img>', '<a>', '<iframe>', '<li>', '<canvas>', '<footer>', '<label>', '<nav>']
const newTag = tags[Math.floor(Math.random() * tags.length)]
const whackedTags = ['</html>', '</head>', '</body>', '</h1>', '</span>', '</script>', '</link>', '</div>', '</h2>', '</button>', '</title>', '</p>', '</h4>', '</img>', '</a>', '</iframe>', '</li>', '</canvas>', '</footer>', '</label>', '</nav>']





function start(){
	gsap.to("h1", {'text-shadow' : '0px 0px 8px white', yoyo: true, repeat: -1})
	let startWindow = document.getElementById('start-window')
	let main = document.getElementById('main')
	let startBtn = document.getElementById('start-button')
	startBtn.addEventListener('click', function() {
		gsap.to(startWindow, {duration: .8, scale: 0, ease: 'back.in'})
		gsap.killTweensOf("h1")
		
	})

}
// start()


function randomHole(){
	holes.forEach(hole => {
		hole.textContent = ''
	})

	
	let newHole = holes[Math.floor(Math.random() * 9)]
	newHole.textContent = newTag
	
	
}

randomHole()

export {tags, whackedTags}