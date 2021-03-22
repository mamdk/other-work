const rand = (l, h) => (l + Math.random() * (h - l)).toFixed(2)
const can = document.querySelector("#can");
let ctx = can.getContext("2d");
const rectCan = can.getBoundingClientRect();

const wb = 64;
const hb = 15;
const ballRadius = 5;
const numRowBloks = 4;
const numColBloks = 7;
const marginBloks = 10;
let space = 50;
const wp = 50;
const hp = 10;
const w = can.width = (wb + (marginBloks)) * numRowBloks + marginBloks;
const h = can.height = ((hb + (marginBloks)) * numColBloks) + space + marginBloks;
let bx = w / 2;
let by = h - hp - ballRadius;
let dx = 1;
let dy = -1;
let dp = w / 2
let startPeddalX = dp

let endGame = false;
let bloks = [];

for (let c = 0; c < numColBloks; c++) {
    bloks[c] = []
    for (let r = 0; r < numRowBloks; r++) {
        bloks[c][r] = { state: 1, x: (r * (w / numRowBloks)) + marginBloks, y: (c * ((h - space) / numColBloks)) + marginBloks }
    }
}

function drawBloks() {
    for (let c of bloks) {
        for (let { state, x, y } of c) {
            if (state === 1) {
                ctx.beginPath();
                ctx.rect(x, y, wb, hb);
                ctx.fillStyle = "#f00"
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(bx, by, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#111"
    ctx.fill();
    ctx.closePath();
}


function drawPeddal() {
    const x = dp;
    let x_ = (x < (wp / 2)) ? 0 : (x > w - (wp / 2)) ? w - (wp) : x - (wp / 2);
    startPeddalX = x_;
    ctx.beginPath();
    ctx.rect(x_, h - hp, wp, hp);
    ctx.fillStyle = "#00f"
    ctx.fill();
    ctx.closePath();
}

function moveBloks() {
    let end = true;
    for (let bs of bloks) {
        for (let b of bs) {
            let { state, x, y } = b;
            if (state == 1) {
                end = false;
                if (bx > x && bx < x + wb && by <= y + hb && by > y) {
                    b.state = 0;
                    dy = -dy;
                }
            }
        }
    }
    endGame = end;
}

function moveSide() {
    if (bx <= 0 || bx >= w) {
        dx = -dx;
    }
    if (by <= 0) {
        dy = -dy;
    }
}

function movePeddal() {
    const sx = startPeddalX;
    const ex = sx + wp;
    const y = h - hp;
    if (by >= y + ~~(ballRadius / 2)) {
        if (bx >= sx && bx <= ex) {
            dy = -dy;
        } else {
            endGame = true;
        }
    }
}


document.onmousemove = (e) => {
    const x = e.pageX || e.clientX;
    dp = x - rectCan.x;
}

let timer = setInterval(() => {
    ctx.clearRect(0, 0, w, h);
    drawBloks();
    drawBall();
    drawPeddal();
    by += dy;
    bx += dx;
    moveBloks();
    moveSide();
    movePeddal()

    if (endGame) clearTimeout(timer);
}, 20)

