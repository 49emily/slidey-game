import React, { useState } from "react";

function ImageBlock(props) {
  function handleClick() {
    props.changeSelectedPos({ row: props.posRow, col: props.posCol });
  }

  return props.imgCol === props.numSquares - 1 && props.imgRow === props.numSquares - 1 ? (
    <div
      className="block-div"
      style={{
        left: (100 / props.numSquares) * props.posCol + "%",
        top: (100 / props.numSquares) * props.posRow + "%",
        width: 80 / props.numSquares - 1 + "vh",
        height: 80 / props.numSquares - 1 + "vh",
      }}
    >
      {" "}
    </div>
  ) : (
    <div
      className="block-div"
      style={{
        backgroundImage: "url(" + props.image + ")",
        backgroundPosition:
          (-80 / props.numSquares) * props.imgCol +
          "vh " +
          (-80 / props.numSquares) * props.imgRow +
          "vh ",
        left: (100 / props.numSquares) * props.posCol + "%",
        top: (100 / props.numSquares) * props.posRow + "%",
        border: props.isSelected ? "solid 3px red" : "solid 3px transparent",
        width: 80 / props.numSquares - 1 + "vh",
        height: 80 / props.numSquares - 1 + "vh",
      }}
      onClick={handleClick}
    >
      {/* <img
        src={props.image}
        className="chosen-image"
        // style={{ objectPosition: props.i * 25 + "% " + props.j * 25 + "%" }}
        style={{ objectPosition: "50% 50%" }}
      ></img> */}
    </div>
  );
}
export default ImageBlock;
