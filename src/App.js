import React from "react";
import Die from "./Die";

export default function App() {

  const [dice, setDice] = React.useState(randomDice());
  console.log(dice)

  function randomDice() {
    const diceArray = [];
    for (let i=0; i<10; i++) {
      diceArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        key: Math.random(),
      });
    }
    return diceArray;
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.key} 
      value={die.value} 
    />
  ));

  function rerollDice() {
    setDice(randomDice);
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {diceElements}
      </div>
      <button 
        onClick={rerollDice}
        className="reroll-button"
      >Roll</button>
    </main>
  );
}