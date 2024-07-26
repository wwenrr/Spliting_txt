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
        let prev = 0
        const chunkSize = 3000;
        for (let i = 1; i < data.length; i++) {
            if ((i - prev) % 3000 == 0) {
                while (data[i] != ' ') i--
                console.log(prev, i);
                arr.push(data.slice(prev, i));
                prev = i
            }
        }
        arr.push(data.slice(prev, data.length));
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


