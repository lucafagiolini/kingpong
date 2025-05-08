import React, { useState, useEffect } from 'react'
// STYLE
import "../style/ScoreCounter.scss"

const ScoreCounter = () => {
  const [blueTeamScore, setblueTeamScore] = useState(0)
  const [redTeamScore, setredTeamScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [winner, setWinner] = useState(null)
  const [currentServer, setCurrentServer] = useState(1) // 1 for player one, 2 for player two

  // Handle score increment
  const incrementScore = (player) => {
    if (isGameOver) return

    if (player === 1) {
      setblueTeamScore(blueTeamScore + 1)
    } else {
      setredTeamScore(redTeamScore + 1)
    }
  }

  // Determine server (changes every 2 points)
  useEffect(() => {
    const totalPoints = blueTeamScore + redTeamScore
    // Server changes every 2 points
    if (totalPoints < 20) {
      // Regular play - change server every 2 points
      setCurrentServer(Math.floor(totalPoints / 5) % 5 + 1)
    } else {
      // Deuce situation (10-10 or higher) - change server every point
      setCurrentServer(totalPoints % 5 + 1)
    }

    // Check if game is over
    if ((blueTeamScore >= 21 || redTeamScore >= 21) && 
        Math.abs(blueTeamScore - redTeamScore) >= 2) {
      setIsGameOver(true)
      setWinner(blueTeamScore > redTeamScore ? 1 : 2)
    }
  }, [blueTeamScore, redTeamScore])

  // Reset game
  const resetGame = () => {
    setblueTeamScore(0)
    setredTeamScore(0)
    setIsGameOver(false)
    setWinner(null)
    setCurrentServer(1)
  }

  return (
    <div className="score-counter">
      <div className="score-display">
        <div className={`player ${currentServer === 1 ? 'serving' : ''}`}>
          <h2>Blue Team{currentServer === 1 && '(Serving)'}</h2>
          <div className="score">{blueTeamScore}</div>
          <button 
            onClick={() => incrementScore(1)}
            disabled={isGameOver}
          >
            +1
          </button>
        </div>
        
        <div className={`player ${currentServer === 2 ? 'serving' : ''}`}>
          <h2>Red Team{currentServer === 2 && '(Serving)'}</h2>
          <div className="score">{redTeamScore}</div>
          <button 
            onClick={() => incrementScore(2)}
            disabled={isGameOver}
          >
            +1
          </button>
        </div>
      </div>

      {isGameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Player {winner} wins!</p>
          <button onClick={resetGame}>New Game</button>
        </div>
      )}
    </div>
  )
}

export default ScoreCounter