import {tags, whackedTags, htmlToText, shuffle, score} from './main.js'

const allRand = shuffle([...tags, ...whackedTags])
const moreShuffle = shuffle([...tags, ...whackedTags])
const newRandTagsText = htmlToText(moreShuffle.join(' '))
const tagText = htmlToText(allRand.join(' '))


const mainMarquee = document.querySelector('.main-marquee')
const marquee = document.querySelector('.marquee')
const marqueeCont = document.querySelectorAll('.marquee-cont')

const marquee2 = document.querySelector('.marquee2')
const marqueeCont2 = document.querySelectorAll('.marquee-cont2')

marquee.firstElementChild.innerHTML = tagText
marquee.lastElementChild.innerHTML = tagText

marquee2.firstElementChild.innerHTML = newRandTagsText
marquee2.lastElementChild.innerHTML = newRandTagsText


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

addEventListener("load", function () {
    marqueeCont2.forEach(el => {
        let rate = 50;
        let distance = el.clientWidth;
        let style = window.getComputedStyle(el);
        let marginRight = parseInt(style.marginRight) || 0;
        let totalDistance = distance + marginRight;
        let time = totalDistance / rate;
        let container = el.parentElement;
        gsap.set(container, {x: -distance })
        gsap.to(container, time, {repeat: -1, x: '+='+totalDistance, ease: Linear.easeNone})
    });
   });
   
