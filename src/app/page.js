"use client";

import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';

const NUMPADTOPROW = [
  {name: "1", value: 1},
  {name: "2", value: 2},
  {name: "3", value: 3},
  {name: "4", value: 4},
  {name: "5", value: 5},
]

const NUMPADBOTTOMROW = [
  {name: "6", value: 6},
  {name: "7", value: 7},
  {name: "8", value: 8},
  {name: "9", value: 9},
  {name: "X", value: 0},
]

function * gridSchemeGen() {
  var key = 0;
  for (var row = 0; row <3; row++) {
    for (var col = 0; col <3; col++) {
      yield {row: row, col: col, key: key++};
    }
  }
}

export default function Home() {
  let gridPositionGen = gridSchemeGen();
  
  
  const [board, setBoard] = useState(Array.from({length: 9}, () => Array.from({length: 9}, () => (<Cell />))));
  
  const handelChange = (row, col, event) => {
    let copy = [...board];
    copy[row][col] = +event.target.value;
    setBoard(copy);
  }
  
  
  
  
  
  return (
    <main>
      <div className={styles.main_flex}>
        <div className={styles.board_container}>
          <div className={styles.board}>
            <LargeGrid />
          </div>
        </div>
        <div className={styles.input_container}>
          <div className={styles.num_pad}>
            {NUMPADTOPROW.map(num => <NumPadButton num={num} />)}
            {NUMPADBOTTOMROW.map(num => <NumPadButton num={num} />)}
          </div>
        </div>
      </div>
    </main>
  )
}

export function NumPadButton({num: num}) {
  return (
    <div key={num.name} className={styles.num_pad_key}>
      <span>{num.name}</span>
    </div>
    )
}

export function LargeGrid() {
  
  const [grid, setCell] = useState(Array.from({length: 9},()=> Array.from({length: 9}, () => null)))
  
  function registerPress(row, col, event) {
    console.log(row);
    console.log(col);
    console.log(event);
    setCellByPos(row, col, "1");
  }
  
  function setCellByPos(row, col, val) {
    console.log("event.target.value")
    let copy = [...grid];
    copy[row][col] = val;
    setCell(copy);
  }
  
  function getCellByPos(row, col) {
    return grid[row][col];
  }
  
  return (
    <div className={styles.large_grid}>
      {
      grid.map(
        (row, rowIndex) => row.map(
          (col, colIndex) =>  
            <Cell
              key={rowIndex + "" + colIndex}
              clickFunction={registerPress}
              row={rowIndex}
              col={colIndex}
              element={col}
            />
          )
        )
      }
    </div>
  )
}



export function Cell({ clickFunction: click, element: value, row:row, col:col}) {
  return (
    <div className={styles.cell} onClick={e => click(row, col, e)}>
      <span>{value}</span>
    </div>
  )
}