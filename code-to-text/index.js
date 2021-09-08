//text to code
function letterToCode(letter) {
    const asc = getASCII(letter)
    const power = Math.ceil(Math.log2(asc))
    let arr = []
    let mod = asc;

    for (let i = power; i >= 0; i--) {
        if (mod - (2 ** i) >= 0) {
            mod -= (2 ** i);
            arr.push("1")
        } else
            arr.push("0")
    }

    return (arr.join(""));
}

//code to text
function codeToLetter(code) {
    const numbers = code.split("");
    let asc = 0;
    numbers.forEach((num, i) => {
        num = Number(num);
        if (num == 1) {
            asc += 2 ** ((numbers.length - 1) - i)
        }
    });

    return String.fromCharCode(asc)
}

//helper
function getASCII(letter) {
    return letter.charCodeAt(0)
}

//main
const _ = (name) => document.querySelector(name);

const btn_toCode = _("#to-code");
const input_text = _("#text");
const res_code = _("#res-code")
const btn_toText = _("#to-text");
const input_code = _("#code");
const res_text = _("#res-text")


btn_toCode.onclick = () => {
    const val = input_text.value.trim();
    if (val) {
        let arr = [];
        const letters = val.split("")
        letters.forEach(letter => {
            arr.push(letterToCode(letter))
        })
        res_code.innerHTML = arr.join(" ");
    }
}

btn_toText.onclick = () => {
    const val = input_code.value.trim();
    if (val) {
        let arr = [];
        const codes = val.split(" ")
        codes.forEach(code => {
            arr.push(codeToLetter(code))
        })
        res_text.innerHTML = arr.join("");
    }
}
