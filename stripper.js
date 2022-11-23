const baseList = require("./5e-SRD-Monsters.json")
const fs = require('fs');
//console.log(baseList)
let res = baseList.map((x) => {return {"name":x.name,"cr":x.challenge_rating}})
console.log(res)
let s = JSON.stringify(res)
fs.writeFile("mobs.json", s, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});