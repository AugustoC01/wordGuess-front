import { useContext } from "react"
import { AppContext } from "../App"

function GameOver() {
  const { gameOver, currAttempt, wordToGuess } = useContext(AppContext)

  return (
    <div className="gameOver">
      <h2>{gameOver.guessedWord ? "Adivinaste la palabra!" : "Perdiste!"}</h2>
      <h3>La palabra era: {wordToGuess}</h3>
      {gameOver.guessedWord && (
        <h3>Adivinaste en {currAttempt.attempt} intentos</h3>
      )}
    </div>
  )
}

export default GameOver
