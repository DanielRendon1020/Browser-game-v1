import {tags, whackedTags} from './main.js'

const allRand = shuffle([...tags, ...whackedTags]) 


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

function htmlToText(rawStr) {
    return rawStr.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}



const tagText = `<pre>${htmlToText(allRand.join(' '))}</pre>`

const marqueeCont = document.querySelectorAll('.marquee-cont')

marqueeCont.forEach(span => {
    span.innerHTML = tagText
})


const spans = document.getElementById('spans').cloneNode(true)
const cloneSpan = document.getElementById('marquee-div').appendChild(spans)

console.log(cloneSpan)

// added event listener because it doesn't get the right width
addEventListener("load", function () {
 marqueeCont.forEach(el => {
  // set a default rate, the higher the value, the faster it is
  let rate = 50;
  // get the width of the element
  let distance = el.clientWidth;
  // get the margin-right of the element
  let style = window.getComputedStyle(el);
  let marginRight = parseInt(style.marginRight) || 0;
  // get the total width of the element
  let totalDistance = distance + marginRight;
  // get the duration of the animation 
  // for a better explanation, see the quoted codepen in the first comment
  let time = totalDistance / rate;
  // get the parent of the element
  let container = el.parentElement;

  gsap.to(container, time, {
   repeat: -1,
   x: '-'+totalDistance,
   ease: Linear.easeNone,
  });
 });
});

// addEventListener("load", function () {
//     spans.forEach(el => {
//      let rate = 50;
//      let distance = el.clientWidth;
//      let style = window.getComputedStyle(el);
//      let marginRight = parseInt(style.marginRight) || 0;
//      let totalDistance = distance + marginRight;
//      let time = totalDistance / rate;
//      let container = el.parentElement;
   
//      gsap.to(container, time, {
//       repeat: -1,
//       x: '-'+totalDistance,
//       ease: Linear.easeNone,
//      });
//     });
//    });
   
