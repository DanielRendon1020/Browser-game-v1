
const holes = [...document.querySelectorAll('.add-tag')]
const tags = ['<html>', '<head>', '<body>', '<h1>', '<span>', '<script>', '<link>', '<div>', '<h2>', '<button>', '<title>', '<p>', '<h4>', '<img>', '<a>', '<iframe>', '<li>', '<canvas>', '<footer>', '<label>', '<nav>']
const newTag = tags[Math.floor(Math.random() * tags.length)]
const whackedTags = ['</html>', '</head>', '</body>', '</h1>', '</span>', '</script>', '</link>', '</div>', '</h2>', '</button>', '</title>', '</p>', '</h4>', '</img>', '</a>', '</iframe>', '</li>', '</canvas>', '</footer>', '</label>', '</nav>']
const scoreCount = document.querySelector('#score span')
let score = 0
let timer = document.querySelector('#count-down')
timer.style.visibility = 'hidden'
let currentTime = 60
let countDown = null
let countDownTimer

function start(){
	gsap.to("h1", {'text-shadow' : '0px 0px 10px white', yoyo: true, repeat: -1})
	let startWindow = document.getElementById('start-window')

	let whacking = null

	function timeLeft(){
		currentTime--
		timer.textContent = currentTime
		if(currentTime === 0){
			clearInterval(countDownTimer)
		}
	}
	

	let startBtn = document.getElementById('start-button')
	startBtn.addEventListener('click', function() {
		gsap.to(startWindow, {duration: .8, scale: 0, ease: 'back.in'})
		gsap.killTweensOf("h1")
		countDown = setTimeout(() => {
			timer.style.visibility = 'visible'
		}, 500)
		countDownTimer = setInterval(timeLeft, 1000)
		whacking = setTimeout(() => {
			whack()
		}, 1500)

	})

}
start()

function whack(){
	if(currentTime === 0){
		return
	}
	const hole = Math.floor(Math.random() * holes.length)
	const newHole = holes[hole]
	let next = null
	const newNewTag = tags[Math.floor(Math.random() * tags.length)]

	newHole.innerHTML = htmlToText(newNewTag)
	gsap.to(newHole, {transform: 'translateY(-170%)', duration:.2, ease: "back.out(2)" })
	let getTag = tags.indexOf(newNewTag)

	function shake(who) {
		gsap.fromTo(who, 0.01, {x:-2,}, {x:2, repeat:20})
	}

	newHole.addEventListener('click', () => {
		score++
		scoreCount.textContent = score
		newHole.innerHTML = htmlToText(whackedTags[getTag])
		shake(newHole)
	}, {once:true})
	
	next = setTimeout(() => {
		gsap.to(newHole, {transform: 'translateY(20%)', duration: .2})
		whack()
	}, 1500)

}


function htmlToText(rawStr) {
    return rawStr.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

export {tags, whackedTags, htmlToText, shuffle}