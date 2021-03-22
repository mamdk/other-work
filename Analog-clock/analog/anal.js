function createElement(html) {
    let tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.firstChild;
}


let clock = document.querySelector('.clock');
let lines = clock.querySelector('.lines');
let hands = clock.querySelectorAll('.hands .hand');
let num = 0;
lines.style.transform = "rotate(-60deg)";

for (let i = 0; i < 60; i++) {
    let deg = i * 6;
    let rad = (deg * Math.PI) / 180;
    let h = i % 5 === 0 ? 10 : 5;
    let x = Math.cos(rad) * (150 - h / 2);
    let y = Math.sin(rad) * (150 - h / 2);
    let line;
    if (h === 10) {
        num++;
        line = createElement(`<div class="line" style="height:${h}px;transform: translateY(-50%) translate(${x}px, ${y}px) rotateZ(${deg + 90}deg);display: flex;justify-content: center;align-items: flex-start"><p style="transform: rotate(${-(deg + 30)}deg)">${num}</p></div>`);
    } else {
        line = createElement(`<div class="line" style="height:${h}px;transform: translateY(-50%) translate(${x}px, ${y}px) rotateZ(${deg + 90}deg);"></div>`);
    }

    lines.appendChild(line);
}



setInterval(() => {
    let d = new Date();
    let time = [changtodegh(d.getHours()), changtodegsm(d.getMinutes()), changtodegsm(d.getSeconds())];

    hands.forEach((anal, index) => {
        anal.style.transform = "rotate(" + time[index] + "deg)";
    })

}, 1000);

let changtodegsm = (e) => e * 6;

let changtodegh = (e) => {
    if (e >= 12) e -= 12;
    return e * 30;
};



