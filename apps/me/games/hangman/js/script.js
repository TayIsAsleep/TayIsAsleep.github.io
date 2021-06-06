//#region "Libraries"
function indexOfAll(array,element){
    // Code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#finding_all_the_occurrences_of_an_element
    let indices = [];
    let idx = array.indexOf(element);
    while (idx != -1) {
        indices.push(idx);
        idx = array.indexOf(element, idx + 1);
    }
    return indices;
};
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
};
String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase() + this.slice(1);
};
function get_css_variable(name){
    return getComputedStyle(document.documentElement).getPropertyValue(name);
};
//#endregion

//#region Setup
let container = document.getElementsByClassName("letters")[0];

"abcdefghijklmnopqrstuvwxyz".split("").forEach(current_char => {
    let newButton = document.createElement("div");
    let newElement = document.createElement("p");

    newButton.classList.add(
        `letter-${current_char}`,
        "letter",
        "button",
        "border"
    );
    newButton.setAttribute("val",current_char);
    newButton.onclick = clickLetter;
    newElement.innerHTML = current_char.toUpperCase();

    newButton.appendChild(newElement);
    container.appendChild(newButton);
});
//#endregion

//#region Global Variables
var word_list = ["able","about","account","acid","across","act","addition","adjustment","advertisement","after","again","against","agreement","air","all","almost","among","amount","amusement","and","angle","angry","animal","answer","ant","any","apparatus","apple","approval","arch","argument","arm","army","art","as","at","attack","attempt","attention","attraction","authority","automatic","awake","baby","back","bad","bag","balance","ball","band","base","basin","basket","bath","be","beautiful","because","bed","bee","before","behaviour","belief","bell","bent","berry","between","bird","birth","bit","bite","bitter","black","blade","blood","blow","blue","board","boat","body","boiling","bone","book","boot","bottle","box","boy","brain","brake","branch","brass","bread","breath","brick","bridge","bright","broken","brother","brown","brush","bucket","building","bulb","burn","burst","business","but","butter","button","by","cake","camera","canvas","card","care","carriage","cart","cat","cause","certain","chain","chalk","chance","change","cheap","cheese","chemical","chest","chief","chin","church","circle","clean","clear","clock","cloth","cloud","coal","coat","cold","collar","colour","comb","come","comfort","committee","common","company","comparison","competition","complete","complex","condition","connection","conscious","control","cook","copper","copy","cord","cork","cotton","cough","country","cover","cow","crack","credit","crime","cruel","crush","cry","cup","cup","current","curtain","curve","cushion","damage","danger","dark","daughter","day","dead","dear","death","debt","decision","deep","degree","delicate","dependent","design","desire","destruction","detail","development","different","digestion","direction","dirty","discovery","discussion","disease","disgust","distance","distribution","division","do","dog","door","doubt","down","drain","drawer","dress","drink","driving","drop","dry","dust","ear","early","earth","east","edge","education","effect","egg","elastic","electric","end","engine","enough","equal","error","even","event","ever","every","example","exchange","existence","expansion","experience","expert","eye","face","fact","fall","false","family","far","farm","fat","father","fear","feather","feeble","feeling","female","fertile","fiction","field","fight","finger","fire","first","fish","fixed","flag","flame","flat","flight","floor","flower","fly","fold","food","foolish","foot","for","force","fork","form","forward","fowl","frame","free","frequent","friend","from","front","fruit","full","future","garden","general","get","girl","give","glass","glove","go","goat","gold","good","government","grain","grass","great","green","grey","grip","group","growth","guide","gun","hair","hammer","hand","hanging","happy","harbour","hard","harmony","hat","hate","have","he","head","healthy","hear","hearing","heart","heat","help","high","history","hole","hollow","hook","hope","horn","horse","hospital","hour","house","how","humour","I","ice","idea","if","ill","important","impulse","in","increase","industry","ink","insect","instrument","insurance","interest","invention","iron","island","jelly","jewel","join","journey","judge","jump","keep","kettle","key","kick","kind","kiss","knee","knife","knot","knowledge","land","language","last","late","laugh","law","lead","leaf","learning","leather","left","leg","let","letter","level","library","lift","light","like","limit","line","linen","lip","liquid","list","little","living","lock","long","look","loose","loss","loud","love","low","machine","make","male","man","manager","map","mark","market","married","mass","match","material","may","meal","measure","meat","medical","meeting","memory","metal","middle","military","milk","mind","mine","minute","mist","mixed","money","monkey","month","moon","morning","mother","motion","mountain","mouth","move","much","muscle","music","nail","name","narrow","nation","natural","near","necessary","neck","need","needle","nerve","net","new","news","night","no","noise","normal","north","nose","not","note","now","number","nut","observation","of","off","offer","office","oil","old","on","only","open","operation","opinion","opposite","or","orange","order","organization","ornament","other","out","oven","over","owner","page","pain","paint","paper","parallel","parcel","part","past","paste","payment","peace","pen","pencil","person","physical","picture","pig","pin","pipe","place","plane","plant","plate","play","please","pleasure","plough","pocket","point","poison","polish","political","poor","porter","position","possible","pot","potato","powder","power","present","price","print","prison","private","probable","process","produce","profit","property","prose","protest","public","pull","pump","punishment","purpose","push","put","quality","question","quick","quiet","quite","rail","rain","range","rat","rate","ray","reaction","reading","ready","reason","receipt","record","red","regret","regular","relation","religion","representative","request","respect","responsible","rest","reward","rhythm","rice","right","ring","river","road","rod","roll","roof","room","root","rough","round","rub","rule","run","sad","safe","sail","salt","same","sand","say","scale","school","science","scissors","screw","sea","seat","second","secret","secretary","see","seed","seem","selection","self","send","sense","separate","serious","servant","sex","shade","shake","shame","sharp","sheep","shelf","ship","shirt","shock","shoe","short","shut","side","sign","silk","silver","simple","sister","size","skin","","skirt","sky","sleep","slip","slope","slow","small","smash","smell","smile","smoke","smooth","snake","sneeze","snow","so","soap","society","sock","soft","solid","some","","son","song","sort","sound","soup","south","space","spade","special","sponge","spoon","spring","square","stage","stamp","star","start","statement","station","steam","steel","stem","step","stick","sticky","stiff","still","stitch","stocking","stomach","stone","stop","store","story","straight","strange","street","stretch","strong","structure","substance","such","sudden","sugar","suggestion","summer","sun","support","surprise","sweet","swim","system","table","tail","take","talk","tall","taste","tax","teaching","tendency","test","than","that","the","then","theory","there","thick","thin","thing","this","thought","thread","throat","through","through","thumb","thunder","ticket","tight","till","time","tin","tired","to","toe","together","tomorrow","tongue","tooth","top","touch","town","trade","train","transport","tray","tree","trick","trouble","trousers","true","turn","twist","umbrella","under","unit","up","use","value","verse","very","vessel","view","violent","voice","waiting","walk","wall","war","warm","wash","waste","watch","water","wave","wax","way","weather","week","weight","well","west","wet","wheel","when","where","while","whip","whistle","white","who","why","wide","will","wind","window","wine","wing","winter","wire","wise","with","woman","wood","wool","word","work","worm","wound","writing","wrong","year","yellow","yes","yesterday","you","young","Bernhard","Breytenbach","Android"];
var word = "Default";
var found = [];
var wrong_guesses = 0;

var obj_flash_text = document.getElementsByClassName("splash-text-text")[0];
var obj_all_letters = Array.from(document.getElementsByClassName("letter"));
var obj_all_word_letters = [];
var obj_word_display = document.getElementsByClassName("word-display")[0];
//#endregion

function debug_updatedababy(){
    let temp = ["LeftStand","RightStand","Base","LongPole","TopBar","Rope","Head", "Body", "LeftArm", "RightArm", "LeftLeg", "RightLeg"];

    for (let i = 0; i < temp.length; i++) {
        document.getElementById(temp[i]).style.opacity = "0";
    };

    for (let i = 0; i < wrong_guesses; i++) {
        document.getElementById(temp[i]).style.opacity = "100";
    };

    if (wrong_guesses >= temp.length){
        lose_animation();
    };
};

function debug_win(){
    obj_all_letters.forEach(i =>{
        if (word.toLowerCase().includes(i.getAttribute("val").toLowerCase())){
            i.click();
        };
    });
}

async function flash_text(text, d=1000){
    obj_flash_text.innerHTML = text; //Replace the text
    obj_flash_text.style.opacity = "100"; //Fade in the text
    await sleep(d); //Wait
    obj_flash_text.style.opacity = "0"; //Fade out the text
    return new Promise(resolve("done"));
};

async function win_animation(){
    // Makes it so that you cant press any of the buttons while the animation plays
    obj_all_letters.forEach(i => {
        i.classList.add("pressed");
    });

    await sleep(500);

    // Moves all the letters togheter
    obj_all_word_letters.forEach(i => {
        i.style.margin = "0px";
    });

    await sleep(500);

    // Set the text color to green
    obj_word_display.style.color = get_css_variable("--correct-color");
    await sleep(200); // Wait for color to change

    if (wrong_guesses < 8){
        await sleep(500);
    }
    if (wrong_guesses == 0){
        flash_text("Perfect! 😎",1000);
    }
    else if (wrong_guesses < 5){
        flash_text("Nice!",1000);
    }
    else if (wrong_guesses < 8){
        flash_text("Good job!",1000);
    }
    await sleep(1000);

    main();
};

async function lose_animation(){
    // Makes it so that you cant press any of the buttons while the animation plays
    obj_all_letters.forEach(i => {
        i.classList.add("pressed");
    });

    await sleep(500);

    // Moves all the letters togheter
    obj_all_word_letters.forEach(i => {
        i.style.margin = "0px";
    });

    await sleep(500);

    // Set the text color to red
    obj_word_display.style.color = get_css_variable("--incorrect-color");
    await sleep(200); // Wait for color to change

    await sleep(500);
    for (let i = 0; i < found.length; i++) {
        document.getElementsByClassName(`word-display-id-${i}`)[0].innerHTML = word.charAt(i);
    }
    await sleep(500);

    flash_text("Uh oh...",1000);
    await sleep(1000);

    main();
};

async function main(){
    obj_word_display.style.opacity = "0";
    await sleep(300);

    word = word_list[Math.floor(Math.random() * word_list.length)].capitalize();
    wrong_guesses = 0;
    found=[];for(let i=0;i<word.length;i++){found.push(word.charAt(i)==' ')}; // Sets all letters as not found (except spaces, which are counted as "correct" by default)

    //#region Reset attributes
    Array.from(obj_all_letters).forEach(i => {
        i.classList.remove("pressed","button-wrong","button-correct");
    });
    Array.from(obj_all_word_letters).forEach(i => {
        i.style.margin = "";
    });
    obj_word_display.style.color = "";
    //#endregion

    //#region UPDATE SCREEN
    obj_word_display.innerHTML = "";
    for (let i = 0; i < word.length; i++) {
        let newElement = document.createElement("p");
        newElement.classList.add(
            "word-display-character",
            `word-display-id-${i}`
        );
        newElement.innerHTML = "_";
        obj_word_display.appendChild(newElement);
    }
    obj_all_word_letters = Array.from(document.getElementsByClassName("word-display-character"));
    //#endregion

    debug_updatedababy();

    await sleep(300);
    obj_word_display.style.opacity = "100";

    let loadingScreen = document.getElementsByClassName("loading-screen")[0];
    if (loadingScreen.style.opacity != 0){
        await sleep(200);
        loadingScreen.style.opacity = 0;
        await sleep(200);
        loadingScreen.style.display = "None";
    }
};

async function clickLetter(){
    if(this.classList.contains("pressed")){return -1;} // Checks if button has been pressed before
    else{this.classList.add("pressed");} // If not, then it flags the button as pressed

    let letter_clicked = this.getAttribute("val");
    let letter_found_at = indexOfAll(word.toLowerCase().split(""), letter_clicked);
    
    // If this is true, that means the letter pressed was not in the word.
    if (letter_found_at.length == 0){
        this.classList.add("button-wrong"); //Make button red

        wrong_guesses += 1;
        console.log("wrong_guesses : ",wrong_guesses)
    }
    else{
        this.classList.add("button-correct"); //Make button green

        letter_found_at.forEach(i => {
            found[i] = true;
            document.getElementsByClassName(`word-display-id-${i}`)[0].innerHTML = word.charAt(i);
        });
    }

    debug_updatedababy();

    if (!found.includes(false)){
        win_animation();
    };
};

main();
