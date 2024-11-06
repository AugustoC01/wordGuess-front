import { useCallback, useEffect, useContext } from "react"
import { AppContext } from "../App"
import Key from "./Key"

function Keyboard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"]
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"]
  const { onSelectLetter, onEnter, onDelete, keyboardStatus } =
    useContext(AppContext)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyboard = useCallback((event) => {
    if (event.key === "Enter") onEnter()
    else if (event.key === "Backspace" || event.key === "Delete") onDelete()
    else {
      keys1.forEach((key) => {
        if (event.key.toLowerCase() == key.toLowerCase()) onSelectLetter(key)
      })
      keys2.forEach((key) => {
        if (event.key.toLowerCase() == key.toLowerCase()) onSelectLetter(key)
      })
      keys3.forEach((key) => {
        if (event.key.toLowerCase() == key.toLowerCase()) onSelectLetter(key)
      })
    }
  })
  //FN TO HANDLE KEYBOARD INPUT
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard)

    return () => {
      document.removeEventListener("keydown", handleKeyboard)
    }
  }, [handleKeyboard])

  // Convert the letters array into a dictionary for easy lookup
  const keyboardStatusMap = {}
  for (const letter in keyboardStatus) {
    keyboardStatusMap[letter] = keyboardStatus[letter]
  }

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys1.map((key) => {
          return <Key keyVal={key} key={key} status={keyboardStatusMap[key]} />
        })}
      </div>
      <div className="line2">
        {keys2.map((key) => {
          return <Key keyVal={key} key={key} status={keyboardStatusMap[key]} />
        })}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} key={"ENTER"} bigKey />
        {keys3.map((key) => {
          return <Key keyVal={key} key={key} status={keyboardStatusMap[key]} />
        })}
        <Key keyVal={"DELETE"} key={"DELETE"} bigKey />
      </div>
    </div>
  )
}

export default Keyboard
