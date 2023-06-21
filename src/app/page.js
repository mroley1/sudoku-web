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
  
  const handleInteraction = (row, col, event) => {
    let copy = [...grid];
    copy[row][col] = +event.target.value;
    setCell(copy);
    
  }
  
  const boxes = [[0,0], [1,0], [2,0], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]]
  console.log(boxes[5])
  return (
    <div className={styles.large_grid}>
      {boxes.map(box => <SmallGrid boxRow={box[0]} boxCol={box[1]} />)}
    </div>
  )
}




export function SmallGrid({ boxRow:row, boxCol:col }) {
  return (
    <div className={styles.box}>
      <Cell row={row} col={col} />
      <Cell row={row} col={col} />
      <Cell row={row} col={col} />
      <Cell row={row} col={col} />
      <Cell row={row} col={col} />
      <Cell row={row} col={col} />
      <Cell row={row} col={col} />
      <Cell row={row} col={col} />
      <Cell row={row} col={col} />
    </div>
  )
}

export function Cell({ row:row, col:col}) {
  const [value, setValue] = useState(null);
  
  function handleClick(val) {
    setValue(val);
  }
  
  return (
    <div className={styles.cell} onClick={() => handleClick("row:" +row + " col:" + col)}>{value}</div>
  )
}