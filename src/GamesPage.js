import { useState, useEffect } from 'react';
import './GamesPage.css';
import controllerImg from './assets/controller.png'; // adjust the path if needed
import { useNavigate } from 'react-router-dom';

const GamesPage = () => {
  const navigate = useNavigate();

  const [riddleSolved, setRiddleSolved] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('visitedGamesPage');

    if (!hasVisited) {
      // This is a page refresh (or first-ever load in this session)
      localStorage.removeItem('riddleSolved');
      localStorage.removeItem('puzzleSolved');
      sessionStorage.setItem('visitedGamesPage', 'true');
    }

    setRiddleSolved(localStorage.getItem('riddleSolved') === 'true');
    setPuzzleSolved(localStorage.getItem('puzzleSolved') === 'true');
  }, []);

  const baseButtons = [
    { label: 'Riddle', path: '/Riddle' },
    { label: 'Puzzle', path: '/Puzzle' },
  ];

  const allButtons = riddleSolved && puzzleSolved
    ? [...baseButtons, { label: 'Final Message', path: '/FinalMessage' }]
    : baseButtons;

  return (
    <div className="games-page">
      <button 
        className="back-to-birthday-btn" 
        onClick={() => navigate('/BirthdayPage')}
      >
        Back
      </button>
      <h2 className="games-title">Choose a Game</h2>

      <div className="games-button-container">
        {allButtons.map((game, index) => (
          <button
            key={index}
            className="game-button"
            onClick={() => navigate(game.path)}
          >
            {game.label}
          </button>
        ))}
      </div>

      {/* Controllers */}
      <img
        src={controllerImg}
        alt="Left Controller"
        className="controller controller-left-fixed"
      />
      <img
        src={controllerImg}
        alt="Right Controller"
        className="controller controller-right-fixed"
      />
    </div>
  );
};

export default GamesPage;