// #region SOUND EFFECTS

// var woosh1 = new Audio('./sounds/woosh1.mp3');

// #endregion SOUND EFFECTS 
// #region GLOBAL VARIABLES

const obj_main_container = document.querySelector(".main-container");
const obj_game_board = document.querySelector(".game-board");

var current_player = 1;
var winner = 0;
var winner_blocks = null;

// #endregion GLOBAL VARIABLES
// #region FUNCTIONS

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function block_onclick(){
    if (this.getAttribute("state") != null){return;};
    if (winner != 0){return winner;};

    this.setAttribute("state", current_player);

    if (check_win() == 0){
        current_player = (current_player == 1 ? 2 : 1);
    }
    else{
        let old_bg_color = winner_blocks[0].style.backgroundColor;

        await sleep(250); // Dramatic pause

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

        await sleep(500); // Dramatic pause 2
        
        obj_game_board.style.transition = "transform 0.75s cubic-bezier(1, -0.25, 0.75, 0.75)";
        obj_game_board.style.transform = "scale(0)";

        await sleep(750); // Wait for animation

        await sleep(300); // "Load" a new game

        Array.from(document.querySelectorAll(".block")).forEach(e => {
            e.removeAttribute("state");
        });

        obj_game_board.style.transition = "transform 1s cubic-bezier(0.5, 0.01, 0.11, 1) 0s";
        obj_game_board.style.transform = "scale(1)";
        current_player = 1;
        winner = 0;
        winner_blocks = null;

        await sleep(1000); // Wait for animation
    };
};

function check_win(){
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
        let this_pattern = [
            all_blocks[pattern[0]].getAttribute("state"),
            all_blocks[pattern[1]].getAttribute("state"),
            all_blocks[pattern[2]].getAttribute("state")
        ];

        winner_blocks = [
            all_blocks[pattern[0]],
            all_blocks[pattern[1]],
            all_blocks[pattern[2]]
        ]

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

    return winner;
};

// #endregion FUNCTIONS
// #region INIT (Needs to be finished before site is displayed to user)

// Create the block elements
for (let i = 0; i < 9; i++){
    let new_div = document.createElement("div");

    new_div.classList.add("block");
    new_div.onclick = block_onclick;

    obj_game_board.appendChild(new_div);
};


// Set width of game board to the height
obj_game_board.style.width = obj_game_board.offsetHeight + "px";
obj_game_board.style.height = obj_game_board.style.width;

// #endregion INIT