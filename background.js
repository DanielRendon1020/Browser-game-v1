import {tags, whackedTags} from './main.js'

const allRand = [...tags, ...whackedTags]

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


// const marquee = new Marquee(document.getElementById('marquee'), {
//     rate: 20, // 20 pixels/s downwards
//     upDown: true, // downwards instead of to the right
//     startOnScreen: false, // start on screen
// });

// const bg = document.createElement('div')
// bg.textContent = 'asdffasffadsufuiiufadsuhif'
// marquee.appendItem(bg)

const marquee = new Marquee(document.getElementById('marquee'));

const $item = document.createElement('div');
$item.textContent = 'testing123';
marquee.appendItem($item);

