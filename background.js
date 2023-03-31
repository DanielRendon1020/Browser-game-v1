import {tags, whackedTags, htmlToText, shuffle} from './main.js'

const allRand = shuffle([...tags, ...whackedTags])


const tagText = htmlToText(allRand.join(' '))

const mainMarquee = document.querySelector('.main-marquee')
const marqueeCont = document.querySelector('.marquee-cont')
const marquee = document.querySelector('.marquee')

marqueeCont.innerHTML = tagText

function makeMore(times, original, appendTo) {
    for(let i = 0; i < times; i++) {
        let clone = original.cloneNode(true)
        appendTo.append(clone);
    }
}

const marqueeClone = makeMore(1, marqueeCont, marquee)
const moarMarquee = makeMore(16, marquee, mainMarquee)


// added event listener because it doesn't get the right width
// addEventListener("load", function () {
//  moarMarquee.forEach(el => {
//   // set a default rate, the higher the value, the faster it is
//   let rate = 50;
//   // get the width of the element
//   let distance = el.clientWidth;
//   // get the margin-right of the element
//   let style = window.getComputedStyle(el);
//   let marginRight = parseInt(style.marginRight) || 0;
//   // get the total width of the element
//   let totalDistance = distance + marginRight;
//   // get the duration of the animation 
//   // for a better explanation, see the quoted codepen in the first comment
//   let time = totalDistance / rate;
//   // get the parent of the element
//   let container = el.parentElement;

//   gsap.to(container, time, {
//    repeat: -1,
//    x: '-'+totalDistance,
//    ease: Linear.easeNone,
//   });
//  });
// });

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
   
