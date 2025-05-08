import React, { useState, useEffect } from 'react'
// STYLE
import "../style/ScoreCounter.scss"

const ScoreCounter = () => {
  const [blueTeamScore, setblueTeamScore] = useState(0)
  const [redTeamScore, setredTeamScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [winner, setWinner] = useState(null)
  const [currentServer, setCurrentServer] = useState("blue") 

  // Handle score increment
  const incrementScore = (player) => {
    if (isGameOver) return

    if (player === "blue") {
      setblueTeamScore(blueTeamScore + 1)
    } else {
      setredTeamScore(redTeamScore + 1)
    }
  }

  // Determine server (changes every 5 points)
  useEffect(() => {
    const totalPoints = blueTeamScore + redTeamScore
    if (totalPoints < 40) {
      // Regular play - change server every 5 points
      setCurrentServer(Math.floor(totalPoints / 5) % 2 === 0 ? "blue" : "red")
    } else {
      // Deuce situation (20-20 or higher) - change server every point
      setCurrentServer(totalPoints % 2 === 0 ? "blue" : "red")
    }

    // Check if game is over
    if ((blueTeamScore >= 21 || redTeamScore >= 21) && 
        Math.abs(blueTeamScore - redTeamScore) >= 2) {
      setIsGameOver(true)
      setWinner(blueTeamScore > redTeamScore ? "blue" : "red")
    }
  }, [blueTeamScore, redTeamScore])

  // Reset game
  const resetGame = () => {
    setblueTeamScore(0)
    setredTeamScore(0)
    setIsGameOver(false)
    setWinner(null)
    setCurrentServer("blue")
  }

  return (
    <div className="score-counter">
      <div className="score-display">
        <div className={`blue-team-box player ${currentServer === "blue" ? 'serving' : ''}`}>
          <h2>Blue Team{currentServer === "blue" && ' (Serving)'}</h2>
          <div className="score">{blueTeamScore}</div>
          <button
            className='increment-button'
            onClick={() => incrementScore("blue")}
            disabled={isGameOver}
          >
            +1
          </button>
        </div>
        
        <div className={`red-team-box player ${currentServer === "red" ? 'serving' : ''}`}>
          <h2>Red Team{currentServer === "red" && ' (Serving)'}</h2>
          <div className="score">{redTeamScore}</div>
          <button 
            className='increment-button'
            onClick={() => incrementScore("red")}
            disabled={isGameOver}
          >
            +1
          </button>
        </div>
      </div>

      {isGameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>{winner === "blue" ? "Blue Team" : "Red Team"} wins!</p>
          <button onClick={resetGame}>New Game</button>
        </div>
      )}
    </div>
  )
}

export default ScoreCounter