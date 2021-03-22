const rand = (l, h) => Math.floor(l + Math.random() * (h - l))
const can = document.querySelector("#can");
const score_span = document.querySelector(".score > span");
const ctx = can.getContext("2d");
const w = can.width = 300;
const h = can.height = 500;
const ballRadius = 10;
const block_h = 20;
const space_blocks = 60;
let blocks = [];
let block = {};
let bx = w / 2
let by = h - (h / 4);
let blocks_speed = -2 / 5;
let score = 0;


for (let i = 0; i < Math.ceil(h / block_h); i++) {
    const space = rand(ballRadius + 10, (ballRadius + 10) * 3 / 2);
    const xs = rand(0, w - space);
    const y = (i * (space_blocks)) + by + ballRadius

    if (i === 0) block = { y, space, xs };

    blocks.push({ y, space, xs })
}



function drawRect(x, y, w, h, color = "#000") {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = color;
    ctx.fill()
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(bx, by, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#0ff";
    ctx.fill();
    ctx.closePath();
}


function drawBlocks() {
    for (let { y, xs, space } of blocks) {
        drawRect(0, y, xs, block_h);
        drawRect(xs + space, y, w - (xs + space), block_h);
    }
}

function blocksMove() {
    for (let i = 0; i < blocks.length; i++) {
        let b = blocks[i];
        b.y += blocks_speed;
        if (by >= b.y - (ballRadius * 2) && by <= b.y) {
            block = b;
        }
    }

    if (blocks[0].y < -space_blocks) {
        blocks.shift();
        score++;
        score_span.innerHTML = `${score}`.padStart(3, 0);
        const space = rand(ballRadius + 10, (ballRadius + 10) * 3 / 2);
        const xs = rand(0, w - space);
        const y = blocks[blocks.length - 1].y + space_blocks;
        blocks.push({ y, space, xs })
    }
}


function moveBall_Blocks() {
    const { y, xs, space } = block
    if (bx > xs && bx < xs + space) {
        by += 5;
        if (by >= h - ballRadius) by = h - ballRadius;
    } else {
        by = y - ballRadius;
    }
}

function checkEnd() {
    if (by < -ballRadius) {
        if (confirm("End Game!!!!\nYou lose\nRestart???")) {
            blocks = [];
            block = {};
            bx = w / 2
            by = h - (h / 4);
            blocks_speed = -2 / 5;
            score = 0;
            score_span.innerHTML = `${score}`.padStart(3, 0);

            for (let i = 0; i < Math.ceil(h / block_h); i++) {
                const space = rand(ballRadius + 10, (ballRadius + 10) * 3 / 2);
                const xs = rand(0, w - space);
                const y = (i * (space_blocks)) + by + ballRadius

                if (i === 0) block = { y, space, xs };

                blocks.push({ y, space, xs })
            }
        } else {
            clearTimeout(gameTimer);
            clearTimeout(harderTimer);
        }
    }
}


document.onkeydown = (e) => {
    if (e.keyCode === 39) {
        if (bx >= w - ballRadius) return;
        bx += 10;
    }
    if (e.keyCode === 37) {
        if (bx <= ballRadius) return;
        bx -= 10;
    }

}


let gameTimer = setInterval(() => {
    ctx.clearRect(0, 0, w, h)
    drawBlocks()
    drawBall()
    blocksMove();
    moveBall_Blocks()
    checkEnd();
}, 20)

let harderTimer = setInterval(() => {
    blocks_speed *= 100 / 99
}, 1500)
