const fs = require('fs');
const path = require('path');

// Simple build script that prepares the application for deployment
const distDir = path.join(__dirname, '..', 'dist');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copy index.html to dist
const indexPath = path.join(__dirname, '..', 'index.html');
const distIndexPath = path.join(distDir, 'index.html');

console.log('Building Roadmap Manager...');
console.log('Copying files to dist/...');

fs.copyFileSync(indexPath, distIndexPath);

// Copy README if exists
const readmePath = path.join(__dirname, '..', 'README.md');
const distReadmePath = path.join(distDir, 'README.md');
if (fs.existsSync(readmePath)) {
    fs.copyFileSync(readmePath, distReadmePath);
}

console.log('Build completed successfully!');
console.log(`Output directory: ${distDir}`);
