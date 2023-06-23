"use client";

import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';

const NUMPADVALUES = [
  {name: "1", value: 1},
  {name: "2", value: 2},
  {name: "3", value: 3},
  {name: "4", value: 4},
  {name: "5", value: 5},
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
  
  const [keypadState, setKeypadState] = useState(null)
  
  function changeKeypadState(state) {
    let val = null
    if (state != null) {
      val = parseInt(state % 10)
    }
    setKeypadState(val);
  }
  
  function clearKeypad() {
    let keys = document.getElementById("keypad").children;
    for (let i = 0; i < keys.length; i++) {
      keys[i].classList.remove(styles.num_pad_key_selected);
    }
  }
  
  function handleKeypadPress(value, event) {
    clearKeypad()
    if (keypadState == value) {
      changeKeypadState(null);
    } else {
      changeKeypadState(value);
      event.target.classList.add(styles.num_pad_key_selected);
    }
  }
  
  return (
    <main>
      <div className={styles.main_flex}>
        <div className={styles.board_container}>
          <div className={styles.board}>
            <LargeGrid keypadState={keypadState} />
          </div>
        </div>
        <div className={styles.input_container}>
          <div id='keypad' className={styles.num_pad}>
            {NUMPADVALUES.map(num => <NumPadButton key={num.name} hook={handleKeypadPress} num={num} />)}
          </div>
        </div>
      </div>
    </main>
  )
}

export function NumPadButton({num: num, hook: click}) {
  return (
    <div className={styles.num_pad_key} onClick={e => {click(num.value, e)}}>
      <span>{num.name}</span>
    </div>
    )
}

export function LargeGrid({ keypadState: keypadState}) {
  
  const [grid, setCell] = useState(Array.from({length: 9},()=> Array.from({length: 9}, () => 0)))
  
  function registerPress(row, col, event) {
    if (keypadState != null) {
      setCellByPos(row, col, keypadState);
    }
  }
  
  function setCellByPos(row, col, val) {
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
              hook={registerPress}
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


function displayValue(value) {
  const key = {0:"", 1:"1", 2:"2", 3:"3", 4:"4", 5:"5", 6:"6", 7:"7", 8:"8", 9:"9"};
  return key[value];
}

export function Cell({ hook: click, element: value, row:row, col:col}) {
  return (
    <div className={styles.cell} onClick={e => click(row, col, e)}>
      <span>{displayValue(value)}</span>
    </div>
  )
}