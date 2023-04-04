
const holes = [...document.querySelectorAll('.add-tag')]
const tags = ['<html>', '<head>', '<body>', '<h1>', '<span>', '<script>', '<link>', '<div>', '<h2>', '<button>', '<title>', '<p>', '<h4>', '<img>', '<a>', '<iframe>', '<li>', '<canvas>', '<footer>', '<label>', '<nav>']
const newTag = tags[Math.floor(Math.random() * tags.length)]
const whackedTags = ['</html>', '</head>', '</body>', '</h1>', '</span>', '</script>', '</link>', '</div>', '</h2>', '</button>', '</title>', '</p>', '</h4>', '</img>', '</a>', '</iframe>', '</li>', '</canvas>', '</footer>', '</label>', '</nav>']
const scoreCount = document.querySelector('#score span')
let score = 0
let countDownTimer
let currentTime = 10
let countDown = null
let whacking = null
let next = null


let timer = document.querySelector('#count-down')
timer.style.visibility = 'hidden'

function timeLeft(){
	currentTime--
	timer.textContent = currentTime
	if(currentTime === 0){
		clearInterval(countDownTimer)
		scoreBoard()
	}
}

addEventListener("load", startWindow, {once:true})
function startWindow(){
	gsap.to("h1", {'text-shadow' : '0px 0px 10px white', yoyo: true, repeat: -1})
	let startWindow = document.getElementById('start-window')

	let startBtn = document.getElementById('start-button')
	startBtn.addEventListener('click', function() {
		gsap.to(startWindow, {duration: .8, scale: 0, ease: 'back.in'})
		gsap.killTweensOf("h1")
		startGame()
	})
}


function startGame(){
	scoreCount.innerHTML = '0'
	score = 0
	countDown = null
	whacking = null
	next = null
	currentTime = 10
	clearInterval(countDownTimer)
	clearTimeout(countDown)
	clearTimeout(whacking)

	countDown = setTimeout(() => {
		timer.style.visibility = 'visible'
	}, 800)
	countDownTimer = setInterval(timeLeft, 1000)
	whacking = setTimeout(() => {
		whack()
	}, 1500)
}


let prevHole = []

function whack(){
	if(currentTime === 0){
		return
	}
	let hole = notTheSameHole(holes)

	function notTheSameHole(array){
		let shuffledHoles = shuffle(array)
		let firstTwo = shuffledHoles.slice(0, 2)
		let currHole = firstTwo[0]
		let nextHole = firstTwo[1]
		function addPrev(notSame){
			prevHole.splice(0, 1, notSame)
		}
		// console.log(prevHole)
		// console.log(currHole)
		// console.log(nextHole)
		while(currHole !== prevHole[0]){
			addPrev(currHole)
			return currHole
		}
		if(currHole === prevHole[0]){
			addPrev(nextHole)
			return nextHole
		}
	}

	const tagPop = hole

	// for some reason I needed to make tags random in here again for it to work
	const newNewTag = tags[Math.floor(Math.random() * tags.length)]

	tagPop.innerHTML = htmlToText(newNewTag)
	gsap.to(tagPop, {transform: 'translateY(-170%)', z: '-5', duration:.5, ease: "back.out(2)" })
	let getTag = tags.indexOf(newNewTag)

	function shake(who) {
		gsap.fromTo(who, 0.01, {x:-2,}, {x:2, repeat:20})
	}

	tagPop.addEventListener('click', () => {
		score++
		scoreCount.textContent = score
		tagPop.innerHTML = htmlToText(whackedTags[getTag])
		shake(hole)
	}, {once:true})
	
	next = setTimeout(() => {
		gsap.to(tagPop, {transform: 'translateY(-10%)', duration: .4, ease: "back.in(2)"})
		
		whack()
	}, 1000)

}


// document.getElementById('add-name').placeholder = `Your score: ${score}`
function scoreBoard(){
	const board = document.getElementById('score-board')
	board.style.visibility = 'visible'
	gsap.set(board, {scale: 0})
	gsap.to(board, {scale:1, duration: 0.8, ease: 'back.out'})

	const prevList = []
	const prevName = document.querySelector('#score-1')
	
	const nameInput = document.getElementById('add-name')
	nameInput.placeholder = `Your score: ${score}`
	const name = document.getElementById('add-name')
	
	document.getElementById('submit').addEventListener('click', function(){
		let playerName = name.value
		if(playerName === ''){
			playerName = '😶‍🌫️'
		}

		let prevGame = `<strong>${playerName}</strong><span class="badge bg-primary rounded-pill">${score}</span>`
		prevList.push(prevGame)
		nameInput.value = ''
		nameInput.placeholder = '👍'
		window.localStorage.setItem("database", prevList.join(" "))
		let getPrevScore = JSON.parse(window.localStorage.getItem('results'))
		window.localStorage.setItem('results', JSON.stringify(getPrevScore))

	}, {once:true})
	
	prevName.innerHTML = window.localStorage.getItem("database")

	
	// const scoreList = document.getElementById('top-five')

	const playAgain = document.getElementById('play-again')
	playAgain.addEventListener('click', function(){
		gsap.to(board, {scale:0, duration: 0.8, ease: 'back.in'})
		startGame()
		
	})
	
}



function htmlToText(rawStr) {
    return rawStr.replace(/</g, "&lt;").replace(/>/g, "&gt;")
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