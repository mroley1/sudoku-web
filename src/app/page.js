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
  
  
  const [blocks, setBlock] = useState(Array.from({length: 9}, () => <SmallGrid />));
  
  
  
  console.log(board)
  
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
  return (
    <div className={styles.large_grid}>
      
    </div>
  )
}




export function SmallGrid() {
  return (
    <div className={styles.box}>
      
    </div>
  )
}

export function Cell() {
  const [value, setValue] = useState(null);
  
  function handleClick() {
    setValue('stuff');
  }
  
  return (
    <div className={styles.cell} onClick={handleClick}>{value}</div>
  )
}