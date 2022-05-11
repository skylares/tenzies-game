import React from "react";
import { nanoid } from "nanoid";

export default function Die(props) {

  function dieFace(value) {
    let arr = [];
    for (let i=0; i<value; i++) {
      arr.push(
        <div 
          className={`die-value`}
          key={nanoid()}
        ></div>
      );
    }
    return arr;
  }

  return(
    <div 
      className={"die"}
      id={props.isHeld ? "held" : null}
      onClick={props.holdDice}
    >
      {dieFace(props.value)}
    </div>
  );
}