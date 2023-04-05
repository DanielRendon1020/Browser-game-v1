
const holes = [...document.querySelectorAll('.add-tag')]
const tags = ['<html>', '<head>', '<body>', '<h1>', '<span>', '<script>', '<link>', '<div>', '<h2>', '<button>', '<title>', '<p>', '<h4>', '<img>', '<a>', '<iframe>', '<li>', '<canvas>', '<footer>', '<label>', '<nav>']
const newTag = tags[Math.floor(Math.random() * tags.length)]
const whackedTags = ['</html>', '</head>', '</body>', '</h1>', '</span>', '</script>', '</link>', '</div>', '</h2>', '</button>', '</title>', '</p>', '</h4>', '</img>', '</a>', '</iframe>', '</li>', '</canvas>', '</footer>', '</label>', '</nav>']
const scoreCount = document.querySelector('#score span')
let score
let countDownTimer
let currentTime 
let countDown 
let whacking
let next 


let timer = document.querySelector('#count-down')

function timeLeft(){
	currentTime--
	timer.textContent = currentTime
	if(currentTime === 0){
		clearInterval(countDownTimer)
		scoreBoard()
	}
}

addEventListener("load", startWindow)

function startWindow(){
	gsap.to("h1", {'text-shadow' : '0px 0px 10px white', yoyo: true, repeat: -1})
	let startWindow = document.getElementById('start-window')

	let startBtn = document.getElementById('start-button')
	startBtn.addEventListener('click', function() {
		gsap.to(startWindow, {duration: .8, scale: 0, ease: 'back.in'})
		gsap.killTweensOf("h1")
		startGame()
	}, {once:true})
}

let quickerTime = 1500

function fastTags(){
	quickerTime = quickerTime * .957
}

function shake(el) {
	gsap.fromTo(el, 0.02, {rotation: -10}, {rotation: 0, repeat: 15})
}

function updateScore(el, i){
	score++
	scoreCount.textContent = score
	el.innerHTML = htmlToText(whackedTags[i])
	shake(el)
}

function startGame(){
	scoreCount.innerHTML = '0'
	score = 0
	countDown = null
	whacking = null
	next = null
	currentTime = 30
	clearInterval(countDownTimer)
	clearTimeout(countDown)
	clearTimeout(whacking)
	quickerTime = 1500


	countDownTimer = setInterval(timeLeft, 1000)

	whacking = setTimeout(() => {
		whack()
	}, quickerTime)
}

let prevHole = []

function notTheSame(array){
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

function whack(){
	let hole = notTheSame(holes)

	const tagPop = hole

	// for some reason I needed to make tags random in here again for it to work
	const newNewTag = tags[Math.floor(Math.random() * tags.length)]

	tagPop.innerHTML = htmlToText(newNewTag)
	gsap.to(tagPop, {transform: 'translateY(-170%)', duration:.3, ease: "back.out(2)" })
	let getTag = tags.indexOf(newNewTag)


	updateScore(tagPop, getTag)

	tagPop.addEventListener('click', updateScore, {once:true})

	
	fastTags()

	if(currentTime === 0){
		clearTimeout(whacking)
		clearTimeout(next)
		tagPop.removeEventListener('click', updateScore)
		tagPop.innerHTML = ''
		score = 0
		return
	}

	// gsap.to(tagPop, {transform: 'translateY(-10%)', duration: .3, ease: "back.in(2)"})

	next = setTimeout(() => {
		gsap.to(tagPop, {transform: 'translateY(-10%)', duration: .3, ease: "back.in(2)"})
		whack()
	}, quickerTime)
	

}


// function moreTags(){
// 	const tagShowerBg = document.createElement('div')
// 	tagShowerBg.setAttribute('class', 'tag-shower')
// 	document.body.appendChild(tagShower)
// 	const tagShower = document.createElement('div')
// 	let tag
// 	let i

// 	for(i = 0; i < 50; i++){
// 		tag = document.createElement('div')
// 		tag.innerHTML = htmlToText('<more-tags>')
// 		tag.setAttribute('class', 'rain-tags')
// 		tag.classList.add('text-center', 'text-light', 'display-5')
// 		tagShower.appendChild(tag)
// 	}

// }
// moreTags()



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
	const addScoreBtn = document.getElementById('submit')
	
	addScoreBtn.addEventListener('click', function(){
		let playerName = name.value
		if(playerName === ''){
			playerName = '😶‍🌫️'
		}

		let prevGame = `<strong>${playerName}</strong><span class="badge bg-primary rounded-pill">${score}</span>`
		prevList.push(prevGame)
		nameInput.value = ''
		nameInput.placeholder = '👍'
		this.classList.add('disabled')
		nameInput.setAttribute('disabled', '')
		window.localStorage.setItem("database", prevList.join(" "))
		let getPrevScore = JSON.parse(window.localStorage.getItem('results'))
		window.localStorage.setItem('results', JSON.stringify(getPrevScore))

	}, {once:true})
	
	prevName.innerHTML = window.localStorage.getItem("database")


	const playAgain = document.getElementById('play-again')
	playAgain.addEventListener('click', function(){
		gsap.to(board, {scale:0, duration: 0.8, ease: 'back.in'})
		addScoreBtn.classList.remove('disabled')
		nameInput.removeAttribute('disabled')
		startGame()
	}, {once: true})
	
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