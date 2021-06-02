// #region SOUND EFFECTS

// var woosh1 = new Audio('./sounds/woosh1.mp3');

// #endregion SOUND EFFECTS 
// #region GLOBAL VARIABLES

const obj_main_container = document.querySelector(".main-container");
const obj_game_board = document.querySelector(".game-board");
const obj_current_turn = document.querySelector(".current-turn");
const obj_score_board = document.querySelector(".score-board");

var current_player = 1;
var winner = 0;
var winner_blocks = null;
var p1_wins = 0;
var p2_wins = 0;

// #endregion GLOBAL VARIABLES
// #region FUNCTIONS

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
};


async function zoom_out(){
    obj_game_board.style.transform = "scale(1)";
    await sleep(1); // Make sure scale is set
    obj_game_board.style.transition = "transform 0.75s cubic-bezier(1, -0.25, 0.75, 0.75)";
    obj_game_board.style.transform = "scale(0)";
    await sleep(750 - 1); // Wait for animation
};
async function zoom_in(){
    obj_game_board.style.transform = "scale(0)";
    await sleep(1); // Make sure scale is set
    obj_game_board.style.transition = "transform 1s cubic-bezier(0.5, 0.01, 0.11, 1) 0s";
    obj_game_board.style.transform = "scale(1)";
    await sleep(1000 - 1); // Wait for animation
};
async function new_game(){
    await zoom_out();

    await sleep(300); // "Load" a new game

    Array.from(document.querySelectorAll(".block")).forEach(e => {
        e.removeAttribute("state");
    });

    current_player = 1;
    winner = 0;
    winner_blocks = null;
    
    zoom_in(); // USED TO BE AWAITED

    // await sleep(100);

    update_current_player(1);
};


function update_scoreboard(){
    obj_score_board.querySelector(".score-counter.p1 p").innerText = p1_wins;
    obj_score_board.querySelector(".score-counter.p2 p").innerText = p2_wins;
};


function update_current_player(override=0){
    if (override != 0){current_player = override}
    else{current_player = (current_player == 1 ? 2 : 1);};

    obj_current_turn.children[0].classList.add(`p${current_player}-turn`)
    obj_current_turn.children[0].classList.remove(`p${(current_player == 1 ? 2 : 1)}-turn`)
};


async function block_onclick(){
    if (this.getAttribute("state") != null){return;};
    if (winner != 0){return winner;};

    this.setAttribute("state", current_player);

    if (await check_win() == 0){
        update_current_player()
    }
    else{
        let old_bg_color = winner_blocks[0].style.backgroundColor;

        await sleep(250); // Dramatic pause

        // Do flashing animation
        for (let i = 0; i < 2; i++){
            await sleep(100);
            winner_blocks.forEach(e => {
                e.style.backgroundColor = "white";
            });

            await sleep(100);
            winner_blocks.forEach(e => {
                e.style.backgroundColor = old_bg_color;
            });
        };

        await sleep(250)
        eval(`p${winner}_wins += 1`)
        update_scoreboard()
        await sleep(250)

        // await sleep(500); // Dramatic pause 2

        await new_game();
    };
};


async function check_win(){
    if (winner != 0){return winner;};
    
    let all_blocks = Array.from(document.querySelectorAll(".block"));

    let to_check = [
        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,4,8],
        [2,4,6]
    ];

    to_check.forEach(pattern => {
        if (winner != 0){return winner;};

        let this_pattern = pattern.map(x => all_blocks[x].getAttribute("state"));
        
        winner_blocks = pattern.map(x => all_blocks[x]);

        if (this_pattern.includes(null)){
            winner_blocks = null;
        }
        else{
            let p1 = this_pattern.includes("1");
            let p2 = this_pattern.includes("2");

            if (p1 && !p2){
                winner = 1;
            };
            if (!p1 && p2){
                winner = 2;
            };  
        };
    });

    // If there are no more empty spaces
    if (winner == 0 && !all_blocks.map(x => x.getAttribute("state")).includes(null)){
        await sleep(800); // Dramatic pause
        await new_game();
    };

    return winner;
};

// #endregion FUNCTIONS
// #region INIT (Needs to be finished before site is displayed to user)

async function init(){

    // Create the block elements
    for (let i = 0; i < 9; i++){
        let new_div = document.createElement("div");

        new_div.classList.add("block");
        new_div.onclick = block_onclick;

        obj_game_board.appendChild(new_div);
    };

    // Set width of game board to the height
    await sleep(1);
    obj_game_board.style.width = obj_game_board.offsetHeight + "px";
    obj_game_board.style.height = obj_game_board.style.width;

    update_current_player(1);
};
init();

// #endregion INIT

// Show board to player
zoom_in();




window.onresize = function(){
    obj_game_board.style.height = "";

    obj_game_board.style.width = obj_game_board.offsetHeight + "px";
    obj_game_board.style.height = obj_game_board.style.width;
}

