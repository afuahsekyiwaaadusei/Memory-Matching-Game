const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();

// Enable CORS for all requests
app.use(cors()); // Enable CORS

// Set up the folder where SVGs are stored (the "asset" folder)
const svgFolderPath = path.join(__dirname, '../asset');

// Serve static files (including SVGs) from the "asset" folder
app.use('/assets', express.static(svgFolderPath));

// Recursive function to get all SVG files in the folder and subfolders
function getAllSVGFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // Recursively search in subdirectories
            arrayOfFiles = getAllSVGFiles(fullPath, arrayOfFiles);
        } else if (file.endsWith('.svg')) {
            // Store relative file path so the client can access the file
            arrayOfFiles.push(path.relative(svgFolderPath, fullPath));
        }
    });

    return arrayOfFiles;
}

// API endpoint to list all SVG files in the folder and subfolders
app.get('/api/svgs', (req, res) => {
    try {
        const svgFiles = getAllSVGFiles(svgFolderPath);
        res.json(svgFiles); // Return the list of SVG file paths
    } catch (err) {
        res.status(500).json({ error: 'Failed to read directory' });
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
