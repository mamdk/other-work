let btn = document.querySelector("#start");
let can = document.querySelector("#can");
let ctx = can.getContext("2d");
let music = can.getAttribute("data-music");
const w = can.width = 300;
const h = can.height = 50;
const ch = h / 2;
let init = false;
let audio = new Audio(music);
let arrAudio, analyseAudio;
let anime, isRun = false;


function drawLine(w,lw = 1,color = "#10101050"){
	ctx.lineWidth = lw;
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(0,ch);
	ctx.lineTo(w , ch);
	ctx.closePath();
	ctx.stroke();
}


function setInitAudio() {
	let contextAudio = new (window.AudioContext || window.webkitAudioContext)();
	let sourceAudio = contextAudio.createMediaElementSource(audio);
	analyseAudio = contextAudio.createAnalyser();

	sourceAudio.connect(analyseAudio);
	analyseAudio.connect(contextAudio.destination)

	arrAudio = new Uint8Array(analyseAudio.frequencyBinCount)
	init = true;
}

function drawDru(){
	let dru = audio.duration;
	let part = audio.currentTime;
	let progress = part / dru;
	drawLine(progress * w ,2, "#eeeeee");
	drawLine(w);
}


let drawCan = () => {
	ctx.fillStyle = "#cccccc";
	ctx.globalAlpha = .5;
	const r = 2;
	const count = 30;
	let part = arrAudio.length / count;
	let wDots = ~~(w / count);
	for (let i = 0; i < count; i++) {
		let avg = (arrAudio.slice(i * part, (i + 1) * part).reduce((a, b) => a + b) / part) * (ch / 255);

		let x = (wDots * i) + 5;
		let y1 = ch - avg - (2 * r);
		let y2 = ch + avg + (2 * r);

		ctx.beginPath();
		// ctx.arc(x, y2, r, 0, Math.PI * 2);
		ctx.arc(x, y1, r, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}

}

btn.onclick = (e) => {
	if (!init) setInitAudio();
	if (isRun) {
		isRun = false;
		audio.pause	();
		clearTimeout(anime);
		btn.innerHTML = "Start";
	} else {
		isRun = true;
		audio.play();
		btn.innerHTML = "Stop";
		anime = setInterval(() => {

			ctx.clearRect(0, 0, w, h)
			analyseAudio.getByteFrequencyData(arrAudio);
			drawCan();
			drawDru();

		}, 10)
	}
}
