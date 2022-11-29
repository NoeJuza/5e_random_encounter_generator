import "./Calculator.css"
import xp_values from "./xp_values.json"
import mobs from "./mobs_with_envs_without_Legacy.json"
import crtable from "./cr.json";
import styled from "@emotion/styled";
import { Button, InputBase, NativeSelect } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

const BootstrapInput = styled(InputBase)(() => ({
    '& .MuiInputBase-input': {
        color: "white",
        borderRadius: 4,
        backgroundColor: "var(--primary-color)",
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        textAlign:"center",
        '&:focus': {
            borderRadius: 4,
            backgroundColor: "var(--primary-color)",
        }
    },
    '& .css-m3l1ig-MuiNativeSelect-select-MuiInputBase-input:not([multiple]) option, .css-m3l1ig-MuiNativeSelect-select-MuiInputBase-input:not([multiple]) optgroup':{
        backgroundColor: "var(--primary-color)",
    },
}));
const ColorButton = styled(Button)(({ theme }) => ({
    color: "var(--text-color)",
    backgroundColor: "var(--primary-color)",
    width: "80%",
    '&:hover': {
      backgroundColor: "var(--primary-color)",
    },
  }));
function Calculator() {
    const [charCount, setCharCount] = useState(1);
    const [charList, setCharList] = useState([{index:0,level:1}])
    const [diff, setDiff] = useState(0);
    const [land, setLand] = useState(0);
    const [minMobs, setMinMobs] = useState(1);
    const [maxMobs, setMaxMobs] = useState(15);
    const [encounterTableList, setEncounterTableList] = useState([])
    const [encounterTable, setEncounterTable] = useState(<></>)

    const handleCharCount = (e) =>{
        setCharCount(e.target.value)
        let list = []
        for (let i = 0; i < e.target.value; i++) {
            list.push({index:i,level:1})
        }
        setCharList(list)
    }
    const handleCharList = (index,value) =>{
        let lst = [...charList]
        lst.find(x=> x.index === index).level = value
        setCharList(lst)
    }
    const handleDiff = (e)=>{
        setDiff(parseInt(e.target.value))
    }
    const handleLand = (e) =>{
        setLand(parseInt(e.target.value))
    }
    const handleMinMobs = (e) =>{
        setMinMobs(parseInt(e.target.value))
    }
    const handleMaxMobs = (e) =>{
        setMaxMobs(parseInt(e.target.value))
    }
    let lstNums = []
    for (let index = 0; index < 41; index++) {
        lstNums.push(index)
    }
    const generate = () =>{
        let maxXP = 0;
        charList.forEach(char => {
            let stringDiff = "";
            switch (diff) {
                case 0:
                    stringDiff = "easy"
                    break;
                case 1:
                    stringDiff = "medium"
                    break;
                case 2:
                    stringDiff = "hard"
                    break;
                case 3:
                    stringDiff = "deadly"
                    break;
                default:
                    break;
            }
            maxXP = maxXP - (- xp_values[char.level-1][stringDiff] )
        });
        console.log(maxXP,minMobs,maxMobs)
        let rXP = maxXP
        let mobsOut = []
        while(rXP>=10){
            let copyRxp = rXP
            let filtered = mobs.filter(x=> ((crtable.find(el=> el.cr === x.cr))?.xp) <= copyRxp  )
            let biomeFiltered
            if (land === 0) {
                biomeFiltered = filtered
            }else{
                biomeFiltered = filtered.filter(x=> x.env.includes(land))
            }
            let rdm = (Math.floor(Math.random() * biomeFiltered.length))
            let mob = biomeFiltered[rdm];
            //console.log(biomeFiltered)
            //console.log(mob)
            mobsOut.push(mob)
            //console.log(parseInt(((crtable.find(el=> el.cr === mob.cr))?.xp)))
            rXP -= parseInt(((crtable.find(el=> el.cr === mob.cr))?.xp))
            console.log(rXP)
            if (mobsOut.length > maxMobs) {
                break;
            }
        }
        console.log(mobsOut)
        setEncounterTableList([...mobsOut])
    }
    useEffect(()=>{
        setEncounterTable(
            <ul>
                {
                    encounterTableList.map(el=>
                        <li key={el.name}>
                            {el.name}
                        </li>
                    )
                }
            </ul>
        )
    },[encounterTableList])
    return (
        <>
            <div className="form-inputs">
                <div className="characters-root">
                    <h2>Characters</h2>
                    <div className="characters-amount-inputs-root">
                        <div>
                            <h3 key={"amount"}>Amount</h3>
                        </div>
                        <NativeSelect
                            input={<BootstrapInput/>}
                            value={charCount}
                            onChange={handleCharCount}
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </NativeSelect>
                    </div>
                    <div className="char-list">
                        { charList.map(x => 
                            <div key={"char"+x.index} className="char-holder">
                                <div>
                                    <h3>Level</h3>
                                </div>
                                <div>
                                    <NativeSelect
                                        key={"char-select-"+ x.index}
                                        input={<BootstrapInput/>}
                                        value={x.level}
                                        onChange={(e) =>{handleCharList(x.index,e.target.value)}}
                                    >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                        <option value={11}>11</option>
                                        <option value={12}>12</option>
                                        <option value={13}>13</option>
                                        <option value={14}>14</option>
                                        <option value={15}>15</option>
                                        <option value={16}>16</option>
                                        <option value={17}>17</option>
                                        <option value={18}>18</option>
                                        <option value={19}>19</option>
                                        <option value={20}>20</option>
                                    </NativeSelect>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
                <div className="difficulty-root">
                    <h2>Difficulty</h2>
                    <div>
                        <NativeSelect
                            input={<BootstrapInput/>}
                            value={diff}
                            onChange={handleDiff}>
                            <option value={0}>Easy</option>
                            <option value={1}>Medium</option>
                            <option value={2}>Hard</option>
                            <option value={3}>Deadly</option>
                        </NativeSelect>
                    </div>
                </div>
                <div className="landscape-root">
                    <h2>Landscape</h2>
                    <NativeSelect
                            input={<BootstrapInput/>}
                            value={land}
                            onChange={handleLand}>
                            <option value={0}>All</option>
                            <option value={1}>Arctic</option>
                            <option value={2}>Coastal</option>
                            <option value={3}>Desert</option>
                            <option value={4}>Forest</option>
                            <option value={5}>Grassland</option>
                            <option value={6}>Hill</option>
                            <option value={7}>Mountains</option>
                            <option value={8}>Swamp</option>
                            <option value={9}>Underdark</option>
                            <option value={10}>Underwater</option>
                            <option value={11}>Urban</option>
                    </NativeSelect>
                </div>
                <div className="enemies-amount-root">
                    <h2>Amount of enemies</h2>
                    <div className="amounts-holder">
                        <div key={"min-holder"} className="min-holder">
                            <h3  key={"min"}>Min</h3>
                            <NativeSelect
                            input={<BootstrapInput/>}
                            value={minMobs}
                            onChange={handleMinMobs}>
                                {
                                    lstNums.map(x=> <><option key={"min"+x}  value={x}>{x}</option></>)
                                }
                            </NativeSelect>
                        </div>
                        <div key={"max-holder"} className="max-holder">
                            <h3  key={"max"}>Max</h3>
                            <NativeSelect
                            input={<BootstrapInput/>}
                            value={maxMobs}
                            onChange={handleMaxMobs}>
                                {
                                    lstNums.map(x=> <><option key={"max"+x} value={x}>{x}</option></>)
                                }
                            </NativeSelect>
                        </div>
                    </div>
                </div>
            </div>
            <div className="button-holder">
                <ColorButton onClick={generate}>Generate</ColorButton>
            </div>
            <div className="encountertable">
                {encounterTable}
            </div>
        </>
    );
  }
  
  export default Calculator;