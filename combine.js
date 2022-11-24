const fs = require("fs")
const arctics = require("./mobs_arctic.json")
const coastals = require("./mobs_coastal.json")
const deserts = require("./mobs_desert.json")
const forests = require("./mobs_forest.json")
const grasslands = require("./mobs_grassland.json")
const hills = require("./mobs_hill.json")
const mountains = require("./mobs_mountains.json")
const swamps = require("./mobs_swamp.json")
const underdarks = require("./mobs_underdark.json")
const underwaters = require("./mobs_underwater.json")
const urbans = require("./mobs_urban.json")
const mobs = require ("./mobs.json")
let fusionned = [];
fusionned.push(...arctics)
fusionned.push(...coastals)
fusionned.push(...deserts)
fusionned.push(...forests)
fusionned.push(...grasslands)
fusionned.push(...hills)
fusionned.push(...mountains)
fusionned.push(...swamps)
fusionned.push(...underdarks)
fusionned.push(...underwaters)
fusionned.push(...urbans)
let sorted = fusionned.sort((a,b) => { return a.name - b.name }  )

let completeUnique = mobs.map(x => {
    out = {}
    let filtered = sorted.filter(a => x.name == a.name)
    if (filtered.length <= 1) {
        let c = sorted.find(el =>el.name === x.name)
        if (c != undefined) {
            out = c
            out.env = [c.env]
        }else{
            out = x
            out.env = [0]
        }
    }else{
        out.env = []
        filtered.forEach(y => {
            out.cr = y.cr
            out.name = y.name
            out.env.push(y.env)
        });
    }
    return out;
})

console.log(completeUnique)

fs.writeFile("mobs_with_envs.json",JSON.stringify(completeUnique), (err)=>{
    if (err){
        console.log("there was a problem")
    }
    console.log("wrote file")
})