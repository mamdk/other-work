class MoveLetter {
    constructor(text = "test", doc = ".move-letter") {
        this.text = text;
        this.doc = document.querySelector(doc);
        this.maxR = 80;
        this.minR = 20;
        this.duration = 2;
        this.letters = this.setLetters();
        this.putTexts();
    }

    rand = (l, h) => (Math.floor(l + Math.random() * (h - l)));

    setLetters() {
        let letters = [];
        let ls = this.text.split("");
        for (let l of ls) {
            letters.push({ text: l, r: this.rand(this.minR, this.maxR), deg: this.rand(0, 360), state: false })
        }
        return letters;
    }

    setLetter(index) {
        this.letters[index].r = this.rand(this.minR, this.maxR);
        this.letters[index].deg = this.rand(0, 360);
    }

    putTexts() {
        this.doc.style.display = "flex";
        this.letters.forEach(({ text }, i) => {
            let div = document.createElement("div");
            div.style.cursor = "default";
            div.innerText = (text == " " ? '\xa0' : text);
            div.onmouseover = (e) => {
                this.move(e.target, i)
            }
            this.doc.appendChild(div);
        });
    }

    move(el, i) {
        let { state, r, deg } = this.letters[i];
        if (!state) {
            this.letters[i].state = true;
            let rad = deg * Math.PI / 180;
            let x = Math.cos(rad) * r;
            let y = Math.sin(rad) * r;
            this.transform(el, deg, x, y, r, i);
        }
    }

    transform(el, deg_, x_, y_, r, i) {
        let x = 0;
        let y = 0;
        let d = 0;
        let sx = x_ / ((this.duration * 100) / 2);
        let sy = y_ / ((this.duration * 100) / 2);
        let sd = deg_ / ((this.duration * 100) / 2);
        let start = false;
        let timer = setInterval(() => {
            el.style.transform = `translateY(${y}px) translateX(${x}px) rotate(${d}deg)`;
            x += sx;
            y += sy;
            d += sd;
            const dis = Math.sqrt((x ** 2) + (y ** 2));
            if ((x > 1 || y > 1) && !start) {
                start = true;
            }
            if (dis >= r) {
                sx = -sx;
                sy = -sy;
                sd = - sd;
            }
            if (dis < .5 && start) {
                el.style.transform = `translateY(0px) translateX(0px) rotate(0deg)`;
                clearTimeout(timer);
                this.setLetter(i);
                this.letters[i].state = false;
            }
        }, 10);
    }

}

let ml = new MoveLetter("hello world");


