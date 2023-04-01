
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
let blur = document.querySelector(':root')

function unblur(){
	blur.style.setProperty('--blur', '0px')
}


// function start(){
// 	gsap.to("h1", {'text-shadow' : '0px 0px 10px white', yoyo: true, repeat: -1})
// 	let startWindow = document.getElementById('start-window')

// 	let whacking = null

// 	function timeLeft(){
// 		currentTime--
// 		timer.textContent = currentTime
// 		if(currentTime === 0){
// 			clearInterval(countDownTimer)
// 		}
// 	}
	

// 	let startBtn = document.getElementById('start-button')
// 	startBtn.addEventListener('click', function() {
// 		gsap.to(startWindow, {duration: .8, scale: 0, ease: 'back.in'})
// 		gsap.killTweensOf("h1")
// 		countDown = setTimeout(() => {
// 			timer.style.visibility = 'visible'
// 			unblur()
// 		}, 800)
// 		countDownTimer = setInterval(timeLeft, 1000)
// 		whacking = setTimeout(() => {
// 			whack()
// 		}, 1500)

// 	})

// }
// start()

function whack(){
	if(currentTime === 0){
		return
	}
	const hole = notTheSameHole(tags)

	function notTheSameHole(array){
		let old
		let new
		let current = Math.floor(Math.random() * array.length)
		while(old != current){
			new === current 
		}
		
		if(output === output){
			output++
		}
	}

	const newHole = holes[hole]
	console.log(hole)
	let next = null
	
	// for some reason I needed to make tags random in here again for it to work
	const newNewTag = tags[Math.floor(Math.random() * tags.length)]

	newHole.innerHTML = htmlToText(newNewTag)
	gsap.to(newHole, {transform: 'translateY(-170%)', z: '-5', duration:.5, ease: "back.out(2)" })
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
		gsap.to(newHole, {transform: 'translateY(20%)', duration: .4, ease: "back.in(2)"})
		whack()
	}, 1500)

}
whack()

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

export {tags, whackedTags, htmlToText, shuffle, score}