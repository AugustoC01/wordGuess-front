import "./App.css"
import { createContext, useState, useEffect } from "react"
import axios from "axios"
import Board from "./components/Board"
import Keyboard from "./components/Keyboard"
import GameOver from "./components/GameOver"
import { boardDefault } from "./Words"
import { API_URL } from "./config"

export const AppContext = createContext()

function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 })
  const [currWord, setCurrWord] = useState("")
  const [wordToGuess, setWordToGuess] = useState("")
  const [gameId, setGameId] = useState("")
  const [resultsArr, setResultsArr] = useState([[], [], [], [], [], []])
  const [keyboardStatus, setKeyboardStatus] = useState([])
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  })

  useEffect(() => {
    try {
      axios.get(API_URL).then((response) => {
        const { gameId, wordToGuess } = response.data
        setWordToGuess(wordToGuess)
        setGameId(gameId)
        // console.log("gameId: ", gameId, " wordToGuess: ", wordToGuess)
      })
    } catch (error) {
      console.error("Error submitting word:", error)
    }
  }, [])

  //CHECKS IF THE WORD EXISTS
  const inexistentWord = () => {
    alert("Esa palabra no existe!")
    setCurrAttempt({
      attempt: currAttempt.attempt - 1,
      letterPos: 5,
    })
  }

  //CHECKS IF THE GAME IS ENDED AND THE RESULT
  const checkResult = (result) => {
    const win = result.every((el) => el === 1)
    if (win) {
      setGameOver({ gameOver: true, guessedWord: true })
    } else if (currAttempt.attempt >= 6)
      setGameOver({ gameOver: true, guessedWord: false })
  }

  useEffect(() => {
    try {
      // console.log("gameId :", gameId)
      if (currWord !== "") {
        axios
          .post(API_URL, {
            gameId,
            value: currWord,
          })
          .then((response) => {
            const { result, disabledLetters } = response.data
            // console.log("result :", result)
            if (result.length !== 0) {
              if (result[0] === -2) {
                inexistentWord() //THAT WORD DOES NOT EXIST IN THE DB
              } else {
                const updatedResults = [...resultsArr]
                updatedResults[currAttempt.attempt - 1] = result
                setResultsArr(updatedResults)
                setKeyboardStatus((prev) => ({ ...prev, ...disabledLetters }))
                checkResult(result)
              }
            }
          })
      }
    } catch (error) {
      console.error("Error submitting word:", error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currWord])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 })
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return
    const word = board[currAttempt.attempt].join("")
    // console.log(word)
    setCurrWord(word)
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 })
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ""
    setBoard(newBoard)
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 })
  }

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onEnter,
          onDelete,
          resultsArr,
          keyboardStatus,
          wordToGuess,
          gameOver,
        }}>
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  )
}

export default App
