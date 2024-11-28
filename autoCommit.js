const fs = require('fs');
const { execSync } = require('child_process');

const fileName = 'dailyUpdate.txt'; // File to update
const commitMessage = `Daily update: ${new Date().toISOString().split('T')[0]}`;

// Generate or modify the file
function generateOrModifyFile() {
    const content = `Updated on ${new Date()}\n`;
    if (fs.existsSync(fileName)) {
        fs.appendFileSync(fileName, content); // Append content if file exists
    } else {
        fs.writeFileSync(fileName, content); // Create file and write content
    }
    console.log(`File ${fileName} updated.`);
}

// Commit changes
function commitChanges() {
    execSync('git add .');
    execSync(`git commit -m "${commitMessage}"`);
    console.log('Changes committed.');
}

// Push changes to remote
function pushChanges() {
    try {
        const pushOutput = execSync('git push origin master', { encoding: 'utf8' });
        console.log('Git Push Output:', pushOutput);
    } catch (error) {
        console.error('Error during push:', error.message);
    }
}


// Main function
function main() {
    generateOrModifyFile();
    commitChanges();
    pushChanges();
}

main();
