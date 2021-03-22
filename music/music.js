const {random, sqrt, PI, sin, cos} = Math;
const pi2 = PI * 2;

let rand = (l, h) => Number((l + random() * (h - l)).toFixed(2));
let degToRad = (deg) => deg * PI / 180;

let img = document.querySelector("img");
let can = document.createElement("canvas");
let ctx = can.getContext("2d");
document.body.insertBefore(can,img);
can.style.zIndex = 1;

let s = can.width = can.height = 300;
img.width = img.height = s;
let s2 = s / 2;
const spaceFlag = 20;
const number_circle = 3;
const spaceDot = 10;
const r_rand = [s2 - spaceFlag, s2];
const speed_circle = [-1, 1];
const w_half = [10, 20];
const h_half = [-10, 10];
let circle = [];
let rotate = 0;

function getDots(r) {
	let c = [];
	let A = pi2 * r;
	let num = ~~(A / spaceDot);
	for (let j = 0; j < num; j++) {
		let deg = j * (360 / num)
		let x = cos(degToRad(deg)) * r + s2;
		let y = sin(degToRad(deg)) * r + s2;
		c.push({x, y});
	}
	return {c, num};
}

function getDot(i, r, nr) {
	let AN = pi2 * nr;
	let numN = ~~(AN / spaceDot);

	let A = pi2 * r;
	let num = ~~(A / spaceDot);

	let i_main = i + (numN - num);
	let deg = i_main * (360 / num)
	let x = cos(degToRad(deg)) * nr + s2;
	let y = sin(degToRad(deg)) * nr + s2;
	return {x, y};
}

function createCircle() {
	for (let i = 0; i < number_circle; i++) {
		let r = rand(...r_rand);
		let speed = rand(...speed_circle);
		let opc = (i + 1) * 0.25;
		let dots = getDots(r);
		let c = dots.c;
		let num = dots.num;
		circle.push({c, r, speed, opc, num})
	}
}

function updateCircle() {
	for (let cir of circle) {
		cir.r += cir.speed;
		if (cir.r >= r_rand[1] || cir.r <= r_rand[0]) {
			cir.speed = -cir.speed;
			cir.r += cir.speed;
		}
		let dots = getDots(cir.r);
		cir.c = dots.c;
		cir.num = dots.num;
	}
}

function drawCircle() {
	ctx.clearRect(0, 0, s, s);
	for (let cir of circle) {
		let num_half = ~~rand(0, cir.num);
		ctx.globalAlpha = cir.opc;
		ctx.strokeStyle = '#ffffff';
		ctx.lineWidth = cir.opc;
		ctx.beginPath();
		ctx.moveTo(cir.c[0].x, cir.c[0].y);

		for (let i = 1; i < cir.c.length; i++) {
			let {x, y} = cir.c[i];
			if (i === num_half && i < cir.c.length - w_half[1]) {
				let wh = ~~rand(...w_half);
				let hh = ~~rand(...h_half);
				let newR = cir.r + hh;
				let i_avg = ~~(((i + wh) + i) / 2);
				let dot1 = getDot(i_avg, cir.r, newR);
				let dot2 = cir.c[i + wh];
				ctx.lineTo(x, y);
				ctx.quadraticCurveTo(dot1.x, dot1.y, dot2.x, dot2.y);
				i += wh;
				continue;
			}
			ctx.lineTo(x, y);
		}

		ctx.lineTo(cir.c[0].x, cir.c[0].y);
		ctx.closePath();
		ctx.stroke();
	}
}



setInterval(() => {
	updateCircle();
	drawCircle();
	img.style.transform = `rotate(${rotate++}deg)`
	if (rotate >= 360) rotate = 0;
} , 100);


createCircle();

