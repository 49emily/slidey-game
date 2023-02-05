import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import ImageBlock from "./ImageBlock";

function App() {
  const [numSquares, setNumSquares] = useState(3);
  const [selectedImg, setSelectedImg] = useState(null);

  const [displayedImg, setDisplayedImg] = useState(null);
  const posArr = Array.from(Array(Math.pow(numSquares, 2)).keys());
  // const orderArr = Array.from(Array(Math.pow(numSquares, 2)).keys());
  // orderArr.sort(() => Math.random() - 0.5);
  const [order, setOrder] = useState(findNewOrder(numSquares));
  const emptyPos = useRef({ row: numSquares - 1, col: numSquares - 1 });
  const [selectedPos, setSelectedPos] = useState({ row: 0, col: 0 });
  const [gameWon, setGameWon] = useState(false);

  function handleChange(event) {
    if (event.target.files.length > 0) {
      setSelectedImg(URL.createObjectURL(event.target.files[0]));
    }
  }

  function handleClick() {
    setOrder(findNewOrder(numSquares));
    setDisplayedImg(selectedImg);
    setGameWon(false);
  }

  function changeSelectedPos({ row, col }) {
    setSelectedPos({ row, col });
  }

  function findNewOrder(num) {
    const orderArr = Array.from(Array(Math.pow(num, 2)).keys());
    orderArr.sort(() => Math.random() - 0.5);
    var count = 0;
    for (var i = 0; i < num; i++) {
      for (var j = i + 1; j < num; j++) {
        if (orderArr[j] < orderArr[i]) {
          count++;
        }
      }
    }
    if (count % 2 === 0) {
      return orderArr;
    }

    return findNewOrder(num);
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.keyCode === 37 && // left
          emptyPos.current.col === selectedPos.col - 1 &&
          emptyPos.current.row === selectedPos.row) ||
        (event.keyCode === 39 && // right
          emptyPos.current.col === selectedPos.col + 1 &&
          emptyPos.current.row === selectedPos.row) ||
        (event.keyCode === 38 && // up
          emptyPos.current.col === selectedPos.col &&
          emptyPos.current.row === selectedPos.row - 1) ||
        (event.keyCode === 40 &&
          emptyPos.current.col === selectedPos.col &&
          emptyPos.current.row === selectedPos.row + 1)
      ) {
        console.log(event);
        // exchange positions of empty square and selected square
        console.log(order);
        var newOrder = [...order];
        var temp = newOrder[selectedPos.row * numSquares + selectedPos.col];
        newOrder[selectedPos.row * numSquares + selectedPos.col] = Math.pow(numSquares, 2) - 1;
        newOrder[emptyPos.current.row * numSquares + emptyPos.current.col] = temp;
        setOrder(newOrder);
        console.log(newOrder);

        var tempSelected = emptyPos.current;
        emptyPos.current = selectedPos;
        setSelectedPos(tempSelected);
        console.log("empty position is at ");
        console.log(emptyPos);

        // check game winning condition
        if (newOrder.every((val, index) => val === posArr[index])) {
          setGameWon(true);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    console.log("event listener added");

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [order, selectedPos, numSquares, posArr]);

  return (
    <div className="App">
      <h1>Choose an image to play a game!</h1>
      <input type="file" accept="image/*" onChange={handleChange} />
      <input type="submit" onClick={handleClick} />
      <div className="mode-div">
        <button
          onClick={() => {
            setNumSquares(2);
            setOrder(findNewOrder(2));
            setGameWon(false);
          }}
        >
          Easy Mode
        </button>
        <button
          onClick={() => {
            setNumSquares(3);
            setOrder(findNewOrder(3));
            setGameWon(false);
          }}
        >
          Normal Mode
        </button>
        <button
          onClick={() => {
            setNumSquares(4);
            setOrder(findNewOrder(4));
            setGameWon(false);
          }}
        >
          Hard Mode
        </button>
      </div>
      {gameWon && (
        <div>
          <h1>Congratulations! You won the game.</h1>
          <p>Choose another image to play again.</p>
        </div>
      )}
      <div className="game-area">
        {displayedImg &&
          posArr.map((i) => {
            console.log(order);
            const posRow = Math.floor(i / numSquares);
            const posCol = i % numSquares;
            const imgRow = Math.floor(order[i] / numSquares);
            const imgCol = order[i] % numSquares;

            if (imgRow === numSquares - 1 && imgCol === numSquares - 1) {
              emptyPos.current = { row: posRow, col: posCol };
            }

            return (
              <ImageBlock
                posRow={posRow}
                posCol={posCol}
                imgRow={imgRow}
                imgCol={imgCol}
                image={displayedImg}
                changeSelectedPos={changeSelectedPos}
                isSelected={posRow === selectedPos.row && posCol === selectedPos.col}
                numSquares={numSquares}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
