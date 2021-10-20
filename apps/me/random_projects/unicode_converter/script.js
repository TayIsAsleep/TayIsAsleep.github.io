// Code from https://www.30secondsofcode.org/js/s/divmod
const divmod = (x, y) => [Math.floor(x / y), x % y]; 

// Based on the Python version here https://stackoverflow.com/a/1119769
function base_encode(value_input, base){
    let arr, rem;

    if (value_input === 0) {return base[0];}
    if (value_input < 0) {return (-1);}

    arr = [];
    while (value_input){
        [value_input, rem] = divmod(value_input, base.length);
        arr.push(base[rem]);
    }

    arr.reverse();
    return arr.join("");
}

function base_decode(value_input, base){
    let num = BigInt(0);

    for (let i = 0; i < value_input.length; i++){ let character = value_input[i];
        value_input = value_input.replace(character, base[0]);
        num += BigInt(base.indexOf(character) * Math.pow(base.length, (value_input.length - (i + 1))))
    }

    return num;
}