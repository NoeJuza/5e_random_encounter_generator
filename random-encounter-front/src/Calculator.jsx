import "./Calculator.css"
import styled from "@emotion/styled";
import { Button, InputBase, NativeSelect } from "@mui/material";
import { useEffect, useState } from "react";

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
    return (
        <>
            <div className="form-inputs">
                <div className="characters-root">
                    <h2>Characters</h2>
                    <div className="characters-amount-inputs-root">
                        <div>
                            <h3>Amount</h3>
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
                            <div key={x.index} className="char-holder">
                                <div>
                                    <h3>Level</h3>
                                </div>
                                <div>
                                    <NativeSelect
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
                </div>
                <div className="landscape-root">
                    <h2>Landscape</h2>
                </div>
                <div className="enemies-amount-root">
                    <h2>Amount of enemies</h2>
                </div>
            </div>
            <div className="button-holder">
                <ColorButton>Generate</ColorButton>
            </div>
        </>
    );
  }
  
  export default Calculator;