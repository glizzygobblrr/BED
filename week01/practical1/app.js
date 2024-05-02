const path = require('node:path');

const notes = '/users/daniel/notes.txt';

path.dirname(notes);
path.basename(notes);
path.extname(notes);

const fs = require('node:fs');

fs.readFile('/Users/daniel/test.txt','utf8',(err,data) =>{
    if (err) {
        console.error(err);
            return;
    }

    console.log(data);
});

const fs = require('node:fs');

const content = 'Some content!';

fs.writeFile('/Users/daniel/test.txt',content, err => {
    if (err){
        console.error(err);
    }else{
        //file written successfully
    }
});

const chalk = require('chalk');

console.log(chalk.yellow('hi!'));