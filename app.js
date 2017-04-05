'use strict';

const takeTurn = require('tic-tac-toe-core');

const board = [[null, null, null],[null, null, null],[null, null, null]];
const players = ['X', 'O'];

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const parseAnswer = (answer) => {
    return answer.replace(/\s/,'').split('').map((d) =>{ return +d; });
};

const getMove = (player) => { return new Promise((resolve) => {
    rl.resume();
    rl.question(`Player '${player}', make your move:`, (answer) => {
        rl.pause();
        return resolve(parseAnswer(answer));
    });
})};

const stalemate = () => {
    console.log('Stalemate :(');
    process.exit(0);
}

const win = (player) => {
    console.log(`Player ${player} has won!`);
    process.exit(0);
}

const printBoard = (board) => {
    let output = `
   0    1    2
0   ${board[0][0] || ' '} | ${board[0][1] || ' '} | ${board[0][2] || ' '}
  -------------
1   ${board[1][0] || ' '} | ${board[1][1] || ' '} | ${board[1][2] || ' '}
  -------------
2   ${board[2][0] || ' '} | ${board[2][1] || ' '} | ${board[2][2] || ' '}
`;
    console.log(output);
};

const handler = (async () => { 
    printBoard(board);
    let currentPlayer = players[0];
    try{
        let move = await getMove(currentPlayer);
        move.push(currentPlayer);
        let result = takeTurn(move, board);
        if(result[0] == 2) return win(currentPlayer);
        if(result[0] == 1) return stalemate();
        players.push(players.shift());
    } catch(e) {
        console.error(e);
    }
    
    handler();
});

handler();