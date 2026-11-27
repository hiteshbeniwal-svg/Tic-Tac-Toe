let board = ["", "", "", "", "", "", "", "", ""]
let human = "X"
let ai = "O"
let gameOver = false
let cells = document.getElementsByClassName("cell")
let statusText = document.getElementById("status")
let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
function checkWinner() {
    for (let i = 0; i < winPatterns.length; i++) {
        let a = winPatterns[i][0]
        let b = winPatterns[i][1]
        let c = winPatterns[i][2]
        if (board[a] != "" && board[a] == board[b] && board[b] == board[c]) {
            return board[a]
        }
    }
    let empty = false
    for (let i = 0; i < 9; i++) {
        if (board[i] == "") {
            empty = true
        }
    }
    if (empty == false) {
        return "draw"
    }
    return null
}
function makeMove(index) {
    if (board[index] != "" || gameOver == true) {
        return
    }
    board[index] = human
    cells[index].innerHTML = human
    let result = checkWinner()
    if (result != null) {
        endGame(result)
        return
    }
setTimeout(function() {
    aiMove()
}, 800)
}
function aiMove() {
    let move = findBestMove()
    if (move == undefined) {
        return
    }
    board[move] = ai
    cells[move].innerHTML = ai
    let result = checkWinner()
    if (result != null) {
        endGame(result)
    }
    else {
        statusText.innerHTML = "Your Turn (X)"
    }
}
function minimax(isMaximizing) {
    let result = checkWinner()
    if (result == ai) {
        return 10
    }
    if (result == human) {
        return -10
    }
    if (result == "draw") {
        return 0
    }
    if (isMaximizing == true) {
        let bestScore = -1000
        for (let i = 0; i < 9; i++) {
            if (board[i] == "") {
                board[i] = ai
                let score = minimax(false)
                board[i] = ""
                if (score > bestScore) {
                    bestScore = score
                }
            }
        }
        return bestScore
    }
    else {
        let bestScore = 1000
        for (let i = 0; i < 9; i++) {
            if (board[i] == "") {
                board[i] = human
                let score = minimax(true)
                board[i] = ""
                if (score < bestScore) {
                    bestScore = score
                }
            }
        }
        return bestScore
    }
}
function findBestMove() {
    let bestScore = -1000
    let bestMove
    for (let i = 0; i < 9; i++) {
        if (board[i] == "") {
            board[i] = ai
            let score = minimax(false)
            board[i] = ""
            if (score > bestScore) {
                bestScore = score
                bestMove = i
            }
        }
    }
    return bestMove
}
function endGame(result) {
    gameOver = true
    if (result == human) {
        statusText.innerHTML = "You Win"
    }

    else if (result == ai) {
        statusText.innerHTML = "AI Wins"
    }

    else {
        statusText.innerHTML = "Draw"
    }
}
function restartGame() {

    board = ["", "", "", "", "", "", "", "", ""]
    gameOver = false

    for (let i = 0; i < 9; i++) {
        cells[i].innerHTML = ""
    }

    statusText.innerHTML = "Your Turn (X)"
}
