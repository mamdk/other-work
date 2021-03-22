let digits = document.querySelectorAll(".digit");

setInterval(() => {
    let d = new Date();
    let time = [d.getHours(), d.getMinutes(), d.getSeconds()].map(num => `${num}`.padStart(2, '0')).join('');
    digits.forEach((digit, index) => digit.setAttribute('data-digit', time[index]));
}, 1000);



