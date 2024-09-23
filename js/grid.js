let row = localStorage.getItem("row") ? parseInt(localStorage.getItem("row")) : 5;
let column = localStorage.getItem("column") ? parseInt(localStorage.getItem("column")) : 4;
const grid = (row && column) ? Array(row * column).fill('🟢') : Array(20).fill('🟢');
let numGames = localStorage.getItem("numGames") ? parseInt(localStorage.getItem("numGames")) : 0;
const fillArray = Array(row * column).fill(null);
const clickedCellIdx = [null, null];
const emptyCellArray = [...grid];
let numClicks = 0;
let moves = 0;
let min;
let sec;
let gameCompleted = 0;





function setGrid() {
    grid.forEach((element, index) => {
        let cell = document.createElement("div");
        cell.className = "grid-item";
        cell.id = index;
        cell.innerHTML = element;
        cell.onclick = function() { handleCellClick(this.id); };
        document.getElementById("container").appendChild(cell);
    });
    document.getElementById("container").style.gridTemplateColumns = `repeat(${column}, 1fr)`;
    document.getElementById("container").style.gridTemplateRows = `repeat(${row}, 1fr)`;
    const gridSize = document.getElementsByClassName("grid-item");
    switch (row * column) {
        case 6:
            for (let element of gridSize){
                element.style.width = "190px";
                element.style.height = "190px";
            }
            break;
        case 12:
            for (let element of gridSize){
                element.style.width = "130px";
                element.style.height = "130px";
            }
            break;
        case 16:
            for (let element of gridSize){
                element.style.width = "130px";
                element.style.height = "130px";
            }
            break;
        case 20:
            for (let element of gridSize){
                element.style.width = "100px";
                element.style.height = "100px";
            }
            break;
        case 30:
            for (let element of gridSize){
                element.style.width = "85px";
                element.style.height = "85px";
            }
            break;
        case 40:
            for (let element of gridSize){
                element.style.width = "70px";
                element.style.height = "65px";
            }
            break;
        case 48:
            for (let element of gridSize){
                element.style.width = "70px";
                element.style.height = "65px";
            }
            break;
        default:
            for (let element of gridSize){
                element.style.width = "100px";
                element.style.height = "100px";
            }
            break;
    }
  
}

function selectSvg(n) {
for (let i = icon.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() * (i + 1)); 
 [icon[i], icon[j]] = [icon[j], icon[i]]; 
}
const newIcon = icon.slice(0, n);
return newIcon;
}
function shuffleArray() {  
const orgArray = selectSvg((row * column)/ 2);
const dupArray = [...orgArray, ...orgArray];

for (let i = dupArray.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() * (i + 1)); // Get a random index
 [dupArray[i], dupArray[j]] = [dupArray[j], dupArray[i]]; // Swap elements
}
return dupArray; // The shuffled array with two of each value
}
function handleStartClick() {
    const svgArray = shuffleArray();
    
    svgArray.forEach((element, index)=> {
        document.getElementById(index).innerHTML = element;
        document.getElementById(index).classList.replace("grid-item.remove","grid-item");
    });
    setTimeout((() => {
        grid.forEach((element, index) => {
            document.getElementById(index).innerHTML = element;
        })
    }), 1000)
    fillArray.forEach((element, index) => {
        fillArray[index] = svgArray[index]
    })
    setTime();
    moves = 0;
    document.getElementById("moves").innerHTML = moves;
}

function handleCellClick(index) {
    const eachCellSvgArray = [...fillArray];
    
    if (document.getElementById(index).className == "grid-item") {
        emptyCellArray[index] = eachCellSvgArray[index];
        moves++
        document.getElementById(index).innerHTML = emptyCellArray[index];
        document.getElementById("moves").innerHTML = moves;
        numClicks++;
        clickedCellIdx[numClicks - 1] = index;
        if (numClicks === 2) {
            if ((emptyCellArray[clickedCellIdx[0]] === emptyCellArray[clickedCellIdx[1]]) && (clickedCellIdx[0] !== clickedCellIdx[1])) {
                setTimeout((() => {
                    clickedCellIdx.forEach(element => {
                        document.getElementById(element).classList.replace("grid-item","grid-item.remove");
                        document.getElementById(element).innerHTML = "";
                        emptyCellArray[element] = null;
                    });
                    if (emptyCellArray.every(((value) => value === null))){
                        numGames++;
                        gameCompleted = 1;
                        localStorage.setItem("sec", sec);
                        localStorage.setItem("min", min);
                        localStorage.setItem("moves", moves);
                        localStorage.setItem("numGames", numGames);
                        localStorage.setItem("gameCompleted", gameCompleted);
                        window.location.href = "../score.html";
                       
                    }
                }), 200)
            } else {
                setTimeout(() => {
                    clickedCellIdx.forEach(element => {
                        emptyCellArray[element] = '🟢';
                        document.getElementById(element).innerHTML = '🟢';
                    });
                }, 200);
            }
            numClicks = 0;
        }
    }
}

function setTime() {
    min  = 0;
    sec = 0;

    setInterval(() => {
        sec++;
        if (sec % 60 === 0)
            {
                min++;
                min < 10 ? document.getElementById("min").innerHTML = '0' + min : document.getElementById("min").innerHTML = min;
                sec = 0;
                document.getElementById("sec").innerHTML = '00'
        } else {
            sec < 10 ? document.getElementById("sec").innerHTML = '0' + sec : document.getElementById("sec").innerHTML = sec;
        } 
    },1000);
}

function reset() {
    setGrid();
    handleStartClick();
    moves = 0
}



document.addEventListener('DOMContentLoaded', setGrid);