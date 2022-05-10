import React from "react";

export default function Die(props) {
  return(
    <div 
      className={"die"}
      id={props.isHeld ? "held" : null}
      onClick={props.holdDice}
    >
      <p className="die-value">{props.value}</p>
    </div>
  );
}