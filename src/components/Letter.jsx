import { useContext } from "react"
import { AppContext } from "../App"

function Letter({ letterPos, attemptVal }) {
  const { board, resultsArr } = useContext(AppContext)
  const letter = board[attemptVal][letterPos]

  const rowResult = resultsArr[attemptVal] || []
  const correct = rowResult[letterPos] === 1
  const almost = !correct && rowResult[letterPos] === 0
  const error = !correct && !almost && rowResult[letterPos] === -1

  const letterStyle = correct
    ? "correct"
    : almost
    ? "almost"
    : error
    ? "error"
    : ""

  return (
    <div className={`letter ${letterStyle}`}>
      {""}
      {letter}
    </div>
  )
}

export default Letter
