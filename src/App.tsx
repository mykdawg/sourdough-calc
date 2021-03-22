import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [sourdoughStarter, setSourdoughStarter] = useState(0);
  const [sourdoughStarterInOz, setSourdoughStarterInOz] = useState(0); 
  const [allPurposeFlour, setAllPurposeFlour] = useState(0);
  const [wholeWheatFlour, setWholeWheatFlour] = useState(0);
  const [water, setWater] = useState(0);
  const [salt, setSalt] = useState(0);

  const starterInputRef = useRef<HTMLInputElement>(null);
  const starterOzInputRef = useRef<HTMLInputElement>(null);

  const handleStarterVal = (e: React.FormEvent) => {
    e.preventDefault();

    const val = +starterInputRef.current!.value;
    setSourdoughStarter(val);
    setSourdoughStarterInOz(convertGramToOz(val));
  } 

  const handleStarterOzVal = (e: React.FormEvent) => {
    e.preventDefault();

    const val = +starterOzInputRef.current!.value;
    setSourdoughStarterInOz(val);
    setSourdoughStarter(convertOzToGram(val));
  } 

  const convertOzToGram = (oz:number) => +(+oz * 28.3495).toFixed(2);
  const convertGramToOz = (gram:number) => +(+gram * .035274).toFixed(2);

  const calcAllPurposeFlour = () => {
    let grams = Math.round((132.3 * +sourdoughStarter)/100);
    setAllPurposeFlour(grams);
  }

  const calcWholeWheatFlour = () => {
    let grams = Math.round((19 * +sourdoughStarter)/100);
    setWholeWheatFlour(grams);
  }

  const calcWater = () => {
    let grams = Math.round((87.25 * +sourdoughStarter)/100);
    setWater(grams);
  }

  const calcSalt = () => {
    let grams = Math.round((2.7 * +sourdoughStarter)/100);
    setSalt(grams);
  }
  
  const calcGramsToTSP = (grams:number, density:number) => {
    return Number((grams / density) * 0.202884136).toFixed(2)
  }
 
  const calcSaltInTSP = (saltVal:number) => calcGramsToTSP(saltVal, 1.201);

  useEffect(() => {
    calcAllPurposeFlour();
    calcWholeWheatFlour();
    calcWater();
    calcSalt();
  });

  return (
    <div className="App">
      <h1>Sourdough Starter Calculator</h1>
      <p>Based on King Arthur Sourdough Bread Recipe</p>
      <form onSubmit={handleStarterVal}>
        <label>Sourdough Starter</label>
        <input type="number" onChange={handleStarterVal} ref={starterInputRef}  value={sourdoughStarter} /> (grams)
        <input type="number" onChange={handleStarterOzVal} ref={starterOzInputRef} value={sourdoughStarterInOz} /> (ounces)
        <p>All Purpose Flour: {allPurposeFlour} grams {convertGramToOz(allPurposeFlour)} oz</p> 
        <p>Whole Wheat Flour: {wholeWheatFlour} grams {convertGramToOz(wholeWheatFlour)} oz</p> 
        <p>Water: {water} grams {convertGramToOz(water)} oz</p> 
        <p>Salt: {salt} grams  ({calcSaltInTSP(salt)} tsp)</p> 
        <button type="submit">Calculate</button>    
      </form>
    </div>
  );
}

export default App;
