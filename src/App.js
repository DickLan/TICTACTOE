import { useState } from "react";
function Square({ value, onSquareClick }) {
  // 點擊時 將 VAL 轉為 x
  // const [value, setValue] = useState("0");

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  // 父層定義參數 準備傳遞給子層
  const [squares, setSquares] = useState(Array(9).fill(null)); // squares : 用來放置格子的陣列
  const [xIsNext, setXIsNext] = useState(true); // 預設第一步為 X

  // 子層 onClick 執行時，呼叫父層的函式 handleClick
  function handleClick(i) {
    // 如果已經被點擊過 或是已經有了結果，则不做任何事
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // 複製一份 squares
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares); // 重新賦值 squares 並 RENDER
    setXIsNext(!xIsNext); // 重新賦值 xIsNext 並 RENDER
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* 不能寫 handleClic(1)，因為這樣就不是傳遞函數到子層，而是直接運行了函式，這樣就太早，順序不對 */}
        {/* 要傳遞參數的話 要用箭頭函式 */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // console.log(squares[a], squares[b], squares[c]);
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log(a, "win!");
      return squares[a];
    }
  }
  return null;
}
