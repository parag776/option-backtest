const csv = require('csv-parser')
const fs = require('fs')
const Fuse = require("fuse.js")

async function parseCSV(link){
    const results = [];
    fs.createReadStream(link)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {

        const searcher = new Fuse(results, {keys: ['name', 'tradingsymbol'], threshold: "0.55"})

        const result = searcher.search('hdfcbank 1500')
        console.log(result[0]);

    });
    
}
parseCSV("D:/front and backend/Geekhunt_frontEnd/my-app/build/instruments.csv");

// async function lala(){
//     const result = await 
//     console.log(result);
// }

// lala();


