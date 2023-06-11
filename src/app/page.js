import Image from 'next/image'
import styles from './page.module.css'

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

export default function Home() {
  return (
    <main>
      <div className={styles.main_flex}>
        <div className={styles.board_container}>
          <div className={styles.board}></div>
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