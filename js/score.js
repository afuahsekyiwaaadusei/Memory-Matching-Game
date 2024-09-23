const rankArray = localStorage.getItem("rankArray") ? JSON.parse(localStorage.getItem("rankArray")) : [];
let dictionary = localStorage.getItem("dictionary") ? JSON.parse(localStorage.getItem("dictionary")) : {};
let row = localStorage.getItem("row");
let column = localStorage.getItem("column");
const moves = localStorage.getItem("moves");
const sec = localStorage.getItem("sec");
const min = localStorage.getItem("min");
let numGames = localStorage.getItem("numGames") ? parseInt(localStorage.getItem("numGames")) : 0;
let gameCompleted = localStorage.getItem("gameCompleted") ? parseInt(localStorage.getItem("gameCompleted")) : 0;
let rankArraySize = 0;
let boardSize = row + "x" + column;
let sizes = ['3x2','4x3','4x4','5x4','6x5','8x5','8x6']

function setScoreInfo(){
    document.getElementById("score-move").innerHTML = "Moves : " + moves;
    document.getElementById("score-time").innerHTML = "Time : " + (min < 10 ? "0" : "") + min + ":" + ( sec < 10 ? "0" : "") + sec;
    setRank();
}
function setRank() {
    if (numGames > 0){
        if (gameCompleted) {
            if (!dictionary[boardSize]) {
                dictionary[boardSize] = {};
                rankArraySize = 0;
                for (let index = 0; index < 3; index++){
                    console.log("set class back to remove")
                    document.getElementById("m" + index).classList.replace("rank-item","rank-item.remove" );
                    document.getElementById("t" + index).classList.replace("rank-item","rank-item.remove");
                    document.getElementById("r" + index).classList.replace("rank-item", "rank-item.remove");
                }
            } else {
                for (let i = 0; i > dictionary[boardSize][0].length; i++) {
                    rankArray[i] = dictionary[boardSize][0][i];
                }
            }
            dictionary[boardSize][moves] = [min, sec];
            localStorage.setItem("dictionary", JSON.stringify(dictionary));
            for (let move in dictionary[boardSize]) { 
                if (move > 0) {
                    if (rankArraySize >= 3) {
                        for (let i = 0; i > 3; i++) {
                            if (move < rankArray[i]) {
                                rankArray[i] = move;
                            }
                        }
                        break;
                    }
                    rankArray[rankArraySize] = move; 
                    rankArraySize++;
                }
            }
            localStorage.setItem("rankArray", JSON.stringify(rankArray));
            rankArray.sort(function(a, b){return a-b});
            dictionary[boardSize][0] = rankArray;
            localStorage.setItem("dictionary", JSON.stringify(dictionary));
        }
        rankArray.forEach((value, index) => {
            document.getElementById("m" + index).innerHTML = value;
            document.getElementById("t" + index).innerHTML = (dictionary[boardSize][value][0] < 10 ? "0" : "") + dictionary[boardSize][value][0] + ":" + ( dictionary[boardSize][value][1] < 10 ? "0" : "") + dictionary[boardSize][value][1] ;
            document.getElementById("m" + index).classList.replace("rank-item.remove", "rank-item");
            document.getElementById("t" + index).classList.replace("rank-item.remove", "rank-item");
            document.getElementById("r" + index).classList.replace("rank-item.remove", "rank-item");
        })
        localStorage.removeItem("rankArray");
        gameCompleted = 0;
    }
}

function retryGame() {
    window.location.href = "../game.html";
}

function selectSize() {
    window.location.href = "../gridSelect.html"
}
function playNext() {
    let index = sizes.indexOf(boardSize);
    let rowColumn  = []
    if (index + 1 == sizes.length)
        index = -1;
    rowColumn = sizes[index + 1].split("");
    localStorage.setItem("row", Number(rowColumn[0]));
    localStorage.setItem("column", Number(rowColumn[2]));
    window.location.href = "../game.html";
}

function setTheme() {
    window.location.href = "../theme.html"
}

document.addEventListener('DOMContentLoaded', setScoreInfo);