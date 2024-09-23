let theme = localStorage.getItem("theme") ? localStorage.getItem("theme") : 'FLAGS'
let iconArray = [];  // Array to store SVG content

// Function to load SVG content by file path
function loadSVG(filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Error loading ${filePath}`);
            if (response.url.includes(theme)) 
                return response.text();  // Get the SVG content as a string
        })
        .then(data => {
            if (data)
                iconArray.push(data);  // Store the SVG content (code) in the array
            //console.log('SVG Loaded:', filePath);
        })
        .catch(error => console.error('Error fetching the SVG:', error));
}

// Fetch the list of SVG files from the Node.js server
fetch('http://localhost:3000/api/svgs')
    .then(response => response.json())
    .then(svgFiles => {
        svgFiles.forEach(fileName => {
            const filePath = `http://localhost:3000/assets/${fileName}`;  // Construct the file path
            loadSVG(filePath);
        });
    })
    .catch(error => console.error('Error fetching SVG file list:', error));

const icon = iconArray;



