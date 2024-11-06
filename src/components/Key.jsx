import { useContext } from "react"
import { AppContext } from "../App"

function Key({ keyVal, bigKey, status }) {
  const { onSelectLetter, onEnter, onDelete } = useContext(AppContext)

  const disabled = status === -1
  // console.log(status)

  const selectLetter = () => {
    if (keyVal === "ENTER") onEnter()
    else if (keyVal === "DELETE") onDelete()
    else onSelectLetter(keyVal)
  }

  return (
    <div
      className="key"
      id={bigKey ? "big" : disabled && "disabled"}
      onClick={selectLetter}>
      {keyVal}
    </div>
  )
}

export default Key
