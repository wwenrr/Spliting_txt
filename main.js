const fs = require('fs');

const arr = []

function readFilePromise(filePath, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

readFilePromise('input.txt', 'utf8')
    .then(data => {
        const chunkSize = 3000;
        for (let i = 1; i < data.length; i++) {
            if (!(i % 3000)) {
                arr.push(data.slice(i - 3000, i));
            }
        }
    })
    .then(() => {
        for (let i = 0; i < arr.length; i++) {
            fs.writeFile(`./output/${i}.txt`, arr[i], { flag: 'w' }, (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                } else {
                    console.log('File has been written or updated successfully.');
                }
            });
        }
    })


