import React, { useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

export default function App() {

  // state to hold dice and their properties
  const [dice, setDice] = React.useState(randomDice());

  // state that represents if the game is over or ongoing 
  const [tenzies, setTenzies] = React.useState(false);

  // state to hold number of rolls in each game
  const [rolls, setRolls] = React.useState(1);

  // states to track game time
  const [startTime, setStartTime] = React.useState(Date.now());
  const [currentTime, setCurrentTime] = React.useState(startTime);
  const [finalTime, setFinalTime] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 100);
    return () => clearInterval(interval);
  }, []);

  function getElapsedTime() {
    let secondsElapsed = (currentTime - startTime) / 1000;
    return (Math.round(secondsElapsed * 10) / 10).toFixed(1);
  }

  // effect to check if game is won
  React.useEffect(() => {
    const dieValue = dice[0].value;
    if (dice.every(die => die.isHeld && dieValue === die.value)) {
      setTenzies(true);
      setFinalTime(getElapsedTime());
    }
  }, [dice]);

  // generates a single random die object with a unique id
  function generateRandomDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  }
  
  // generates an array which contains 10 dice objects
  function randomDice() {
    const diceArray = [];
    for (let i=0; i<10; i++) {
      diceArray.push(generateRandomDie());
    }
    return diceArray;
  }

  // generates new dice except for those with a truthy value for isHeld
  function rerollDice() {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : generateRandomDie();
    }));
    setRolls(prevRolls => prevRolls + 1);
  }

  // flips the isHeld property on the selected die
  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => (
      die.id === id ? {...die, isHeld: !die.isHeld} : die
    )));
  }

  // restarts the game after finishing
  function newGame() {
    setTenzies(false);
    setDice(randomDice);
    setRolls(1);
    setStartTime(Date.now());
    setFinalTime(0);
  }

  // generates the 10 die elements to display 
  const diceElements = dice.map(die => (
    <Die
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="description">Roll until all dice are the same. Click a die to freeze it at its current value.</p>
      <div className="die-container">
        {diceElements}
      </div>
      <button 
        onClick={tenzies ? newGame : rerollDice}
        className="reroll-button"
      >{tenzies ? "New Game" : "Roll"}
      </button>
      <div className="score">
        <h2 className="rolls">{`rolls: ${rolls}`}</h2>
        <h2 className="time">time: {tenzies ? finalTime : getElapsedTime()}</h2>
      </div>
    </main>
  );
}