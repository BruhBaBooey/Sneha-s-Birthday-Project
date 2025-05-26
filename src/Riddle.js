import React, { useState } from 'react';
import './RiddleGame.css';

const riddleData = {
  question: `In a house where secrets sleep,  
A haunting silence starts to creep.  
Two seekers of truth take on the fear,  
What name brings the darkness near?`,
  answers: ["the conjuring" , "conjuring"],
  hints: [
    "It features real-life paranormal investigators Ed and Lorraine Warren.",
    "The title contains the word 'The.'",
    "You watched this film with your best friend.",
  ],
};

export default function RiddleGame() {
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [shownHints, setShownHints] = useState(0);

  const checkAnswer = () => {
  const userInput = input.trim().toLowerCase();
  if (riddleData.answers.includes(userInput)) {
    setFeedback('🎉 Correct! Well done!');
  } else {
    setFeedback('❌ Try again!');
  }
};

  const revealHint = () => {
    if (shownHints < riddleData.hints.length) {
      setShownHints(shownHints + 1);
    }
  };

  return (
    <div className="riddle-container">
      <h2 className="riddle-title">🎭 Guess the Horror Movie</h2>
      <pre className="riddle-question">{riddleData.question}</pre>

      <input
        type="text"
        placeholder="Your answer"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="riddle-input"
      />

      <div className="riddle-actions">
        <button onClick={checkAnswer} className="riddle-submit">Submit</button>
        {shownHints < riddleData.hints.length && (
          <button
          onClick={revealHint}
          className="riddle-hint"
          disabled={shownHints >= riddleData.hints.length}
          aria-label={`Need a hint, ${riddleData.hints.length - shownHints} left`}
          >Need a Hint? {riddleData.hints.length - shownHints} left
        </button>

        )}
      </div>

      {feedback && <p className="riddle-feedback">{feedback}</p>}

      <ul className="riddle-hints">
        {riddleData.hints.slice(0, shownHints).map((hint, index) => (
          <li key={index} className="riddle-hint-item">💡 {hint}</li>
        ))}
      </ul>
    </div>
  );
}
