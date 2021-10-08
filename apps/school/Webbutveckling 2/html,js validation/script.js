function randomInteger(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; } // Code from https://stackoverflow.com/a/29246176

function submit() {
    var varfirstname = document.getElementById("firstname")
    var varlastname = document.getElementById("lastname")
    var varpassword1 = document.getElementById("password1")
    var varpassword2 = document.getElementById("password2")
    var varmail = document.getElementById("mail")

    /* Validate First/Last name */
    if (varfirstname.value == ""){
        alert("Skriv in ett förnamn"); return
    }
    if (varlastname.value == ""){
        alert("Skriv in ett efternamn"); return
    }


    /* Validate Password */
    if (varpassword1.value.length <= 6){
        alert("Ditt lösenord måste innehålla minst 6 tecken"); return
    }
    if (varpassword1.value != varpassword2.value){
        alert("Lösenorden matchar ej"); return
    }
    
    /* Validate eMail*/
    if (!varmail.value.match(/^\S+@\S+\.\S+$/)){
        alert("Email är ej korrekt"); return
    }
    
    location.href = 'klar.html';
}


function generate_n_random_numbers(n, min, max){
    if (n > (max - min)){ return -1; }

    let a = []
    while (a.length < n){
        let r = randomInteger(min, max)
        if (!a.includes(r)){ a.push(r); }
    }
    return a;
}


/* Generate random numbers */
var numbers = generate_n_random_numbers(10, 0, 100);

document.getElementById('unsorted').innerHTML = numbers;
document.getElementById('sorted').innerHTML = numbers.sort((a, b) => a - b);