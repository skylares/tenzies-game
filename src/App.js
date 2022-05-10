import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

export default function App() {

  // state to hold dice and their properties
  const [dice, setDice] = React.useState(randomDice());

  // state that represents if the game is over or ongoing 
  const [tenzies, setTenzies] = React.useState(false);

  //state to hold number of rolls in each game
  const [rolls, setRolls] = React.useState(1);

  // effect to check if game is won
  React.useEffect(() => {
    const dieValue = dice[0].value
    if (dice.every(die => die.isHeld && dieValue === die.value)) {
      setTenzies(true);
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
  console.log(rolls);

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
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
        <h2 className="time">time:</h2>
      </div>
    </main>
  );
}