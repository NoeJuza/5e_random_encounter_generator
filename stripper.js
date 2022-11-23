const baseList = require("./mobs.json")
const fs = require('fs');
//console.log(baseList)
let res = baseList.filter(x => !(x.name.includes("Legacy")) )
console.log(res)

let s = JSON.stringify(res)
fs.writeFile("mobs_without_Legacy.json", s, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    console.log("JSON file has been saved.");
});