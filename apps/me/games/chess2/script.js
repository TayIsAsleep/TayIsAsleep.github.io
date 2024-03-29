const chess_board = document.querySelector("div.chess-board");
const pieces_out_p1 = document.querySelector("div.pieces-out-p1");
const pieces_out_p2 = document.querySelector("div.pieces-out-p2");

var selected_piece = null;

function create_chess_piece(type, color, x, y){
    let piece = document.createElement("img");
    
    piece.src = `./img/${type}.png`
    piece.classList.add("piece-image");
    piece.setAttribute("color", color)
    piece.setAttribute("type", type)

    document.querySelector(`div.chess-square[x="${x}"][y="${y}"]`).appendChild(piece);
}

function legal_move(piece){
    return true;
    if (piece.classList.contains("piece-type-pawn")){
        let my_x = piece.parentElement.getAttribute("x");
        let my_y = piece.parentElement.getAttribute("y");

        // document.querySelector(`div.chess-square[x="${my_x}"][y="${my_y-1}"]`)
    }
    return true;
}

//#region INIT

// Create all the chess squares
for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
        
        let new_chess_square = document.createElement("div");
        let letter = document.createElement("p");
        
        if (y == 0 || y == 9){
            letter.innerText = " ABCDEFGH ".charAt(x);
            new_chess_square.classList.add("coordinate-container");
            new_chess_square.appendChild(letter);
        }
        else if (x == 0 || x == 9){
            letter.innerText = y;
            new_chess_square.classList.add("coordinate-container");
            new_chess_square.appendChild(letter);
        }
        else{
            new_chess_square.classList.add(
                "chess-square",
                ((x + y) % 2 ? "black" : "white")
            );
            new_chess_square.setAttribute("x",x-1)
            new_chess_square.setAttribute("y",y-1)
        }
        
        chess_board.appendChild(new_chess_square);
    }
}

// Create all the pieces
[{"color":"black","close_row_y":0,"far_row_y":1},
{"color":"white","close_row_y":7,"far_row_y":6}]
.forEach(current => {
    for (let i = 0; i < 8; i++) {
        create_chess_piece("pawn", current['color'], i, current['far_row_y'])
    }
    create_chess_piece("rook", current['color'], 0, current['close_row_y'])
    create_chess_piece("rook", current['color'], 7, current['close_row_y'])
    create_chess_piece("knight", current['color'], 1, current['close_row_y'])
    create_chess_piece("knight", current['color'], 6, current['close_row_y'])
    create_chess_piece("bishop", current['color'], 2, current['close_row_y'])
    create_chess_piece("bishop", current['color'], 5, current['close_row_y']) 
    create_chess_piece("queen", current['color'], 3, current['close_row_y'])
    create_chess_piece("king", current['color'], 4, current['close_row_y'])
});

//#endregion

//#region Event handles

document.querySelectorAll('.chess-square').forEach(item => {
    item.addEventListener('click', event => {
        if (selected_piece == null){
            if (item.hasChildNodes()){
                selected_piece = item.firstChild;
                item.firstChild.classList.add("holding");
            }
        }
        else{
            // Prevents user placing multiple pieces on one thing
            if (
                item.hasChildNodes() && 
                item.firstChild != selected_piece &&
                item.firstChild.getAttribute("color") == selected_piece.getAttribute("color")
            ){return;};

            if (legal_move(selected_piece)){
                

                if (item.hasChildNodes() && item.firstChild.getAttribute("color") != selected_piece.getAttribute("color")){
                    if (selected_piece.getAttribute("color") == "white"){
                        pieces_out_p1.appendChild(item.firstChild)
                    }
                    else{
                        pieces_out_p2.appendChild(item.firstChild)
                    }
                }

                let from_pos = selected_piece.parentElement

                selected_piece.classList.remove("holding");
                item.appendChild(selected_piece);

                let to_pos = selected_piece.parentElement

                console.log(
                    "Moved from " + ("ABCDEFGH"[parseInt(from_pos.getAttribute("x"))] + (parseInt(from_pos.getAttribute("y")) + 1))
                    + " to " + 
                    ("ABCDEFGH"[parseInt(to_pos.getAttribute("x"))] + (parseInt(to_pos.getAttribute("y")) + 1))
                );
                
                

                selected_piece = null;
            }
        };
    });
});

document.addEventListener('mousemove', function(e){
    if (selected_piece == null){return;};

    selected_piece.style.left = e.pageX - selected_piece.parentElement.offsetLeft + 'px'; // - (selected_piece.parentElement.offsetWidth / 2)
    selected_piece.style.top = e.pageY - selected_piece.parentElement.offsetTop + 'px'; // - (selected_piece.parentElement.offsetHeight / 2)
});

//#endregion
