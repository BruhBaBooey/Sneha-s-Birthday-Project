import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './PuzzleGame.css';
import puzzleImage from './assets/puzzle-image.png';

const pieceCount = 3;
const totalPieces = pieceCount * pieceCount;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Puzzle() {
    const [board, setBoard] = useState(Array(totalPieces).fill(null));
    const [tray, setTray] = useState([]);
    const [isComplete, setIsComplete] = useState(false);

useEffect(() => {
  // Put all pieces shuffled into the tray on mount
  setTray(shuffleArray([...Array(totalPieces).keys()]));
}, []);


// put checkCompletion inside useEffect to avoid warning
useEffect(() => {
  const checkCompletion = () => {
    const correct = board.every((piece, idx) => piece === idx);
    if (correct && !isComplete) {
      setIsComplete(true);
      launchConfetti();
    }
  };
  checkCompletion();
}, [board, isComplete]);


  const launchConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleDrop = (targetIndex, source) => {
  const { from, index } = source;

  if (from === 'tray') {
    const piece = tray[index];
    const newTray = [...tray];
    newTray.splice(index, 1);

    const newBoard = [...board];

    // If the target slot already has a piece, send it back to tray
    if (newBoard[targetIndex] !== null) {
      newTray.push(newBoard[targetIndex]);
    }

    newBoard[targetIndex] = piece;

    setTray(newTray);
    setBoard(newBoard);
  } else if (from === 'board') {
    const sourcePiece = board[index];
    const targetPiece = board[targetIndex];
    const newBoard = [...board];
    newBoard[targetIndex] = sourcePiece;
    newBoard[index] = targetPiece;
    setBoard(newBoard);
  }
};


  const handleReturnToTray = (boardIndex) => {
    const piece = board[boardIndex];
    const newBoard = [...board];
    newBoard[boardIndex] = null;
    setBoard(newBoard);
    setTray([...tray, piece]);
  };

  const onDragStart = (e, from, index) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ from, index }));
  };

  const getBackgroundPosition = (index) => {
    const x = (index % pieceCount) * (100 / (pieceCount - 1));
    const y = Math.floor(index / pieceCount) * (100 / (pieceCount - 1));
    return `${x}% ${y}%`;
  };

  return (
    <div className="puzzle-wrapper">
      <h2 className="puzzle-title">🧩 Solve the Jigsaw</h2>

      <div className="puzzle-board">
        {board.map((pieceIndex, i) => (
          <div
            key={i}
            className="puzzle-slot"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const source = JSON.parse(e.dataTransfer.getData('text/plain'));
              handleDrop(i, source);
            }}
          >
            {pieceIndex !== null && (
              <div
                className={`puzzle-piece ${isComplete ? 'disabled' : ''}`}
                draggable
                onDragStart={(e) => onDragStart(e, 'board', i)}
                onDoubleClick={() => handleReturnToTray(i)}
                style={{
                  backgroundImage: `url(${puzzleImage})`,
                  backgroundSize: `${pieceCount * 100}%`,
                  backgroundPosition: getBackgroundPosition(pieceIndex),
                }}
              />
            )}
          </div>
        ))}
        {isComplete && (
            <img
                src={puzzleImage}
                alt="Completed Puzzle"
                className="full-image visible"
            />
        )}
      </div>

      <div className="puzzle-tray">
        {tray.map((pieceIndex, i) => (
          <div
            key={pieceIndex}
            className={`puzzle-piece ${isComplete ? 'disabled' : ''}`}
            draggable
            onDragStart={(e) => onDragStart(e, 'tray', i)}
            style={{
              backgroundImage: `url(${puzzleImage})`,
              backgroundSize: `${pieceCount * 100}%`,
              backgroundPosition: getBackgroundPosition(pieceIndex),
            }}
          />
        ))}
      </div>

      {isComplete && <p className="completion-message">🎉 Puzzle Complete!</p>}
    </div>
  );
}
