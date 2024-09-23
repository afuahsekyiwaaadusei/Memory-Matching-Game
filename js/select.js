function gridSize(index) {
    let gridSize = [];
    
    gridSize = document.getElementById(index).innerHTML.split("");
    localStorage.setItem("row", Number(gridSize[0]));
    localStorage.setItem("column", Number(gridSize[2]));
    window.location.href = "./theme.html";
 
}

function themeSelect(index) {
    let theme = document.getElementById(index).innerText
    localStorage.setItem("theme", theme);
    window.location.href = "./game.html";
}

