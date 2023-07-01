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


export class CellData {
  #value = 0;
  #marked = [];
  constructor() {
    this.#value = 0;
    this.#marked = [];
  }
  getValue() {
    return this.#value;
  }
  getMarked() {
    return this.#marked;
  }
  setValue(value) {
    this.#value = value;
    this.#marked = [];
  }
  addMarked(mark) {
    this.#value = 0;
    this.#marked.push(mark);
  }
  removeMarked(mark) {
    this.#value = 0;
    this.#marked.pop(mark);
  }
}


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
  
  const [grid, setCell] = useState(Array.from({length: 9},()=> Array.from({length: 9}, () => new CellData())))
  
  function registerPress(row, col, event) {
    if (keypadState != null) {
      setCellByPos(row, col, keypadState);
    }
  }
  
  function setCellByPos(row, col, val) {
    let copy = [...grid];
    copy[row][col].setValue(val);
    setCell(copy);
  }
  
  function getCellByPos(row, col) {
    return grid[row][col].getValue();
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
              keypadState={keypadState}
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

export function Cell({ hook: click, element: value, row:row, col:col, keypadState:keypadState}) {
  let style = {transitionDelay: Math.random()/4+"s"}
  if (keypadState == value.getValue() && keypadState != 0) {
    style = {
      backgroundColor: "green",
      transitionDelay: Math.random()/4+"s"
    }
  }
  
  return (
    <div className={styles.cell} onClick={e => click(row, col, e)}>
      <div className={styles.cell_highlight} style={style}>
        <span>{displayValue(value.getValue())}</span>
      </div>
    </div>
  )
}