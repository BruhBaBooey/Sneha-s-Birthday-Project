import React from 'react';
import './GamesPage.css';
import controllerImg from './assets/controller.png'; // adjust the path if needed
import { useNavigate } from 'react-router-dom';

const GamesPage = () => {
  const navigate = useNavigate();

  const gameButtons = [
    { label: 'Riddle', path: '/Riddle' },
    { label: 'Puzzle', path: '/Puzzle' },
  ];

  return (
    <div className="games-page">
      <h2 className="games-title">Choose a Game</h2>

      <div className="games-button-container">
        {gameButtons.map((game, index) => (
          <button
            key={index}
            className="game-button"
            onClick={() => navigate(game.path)}
          >
            {game.label}
          </button>
        ))}
      </div>

      {/* Left & Right Controllers */}
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
