import { useState, useRef, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './home';
import BirthdayPage from './BirthdayPage';
import Games from './GamesPage';
import Riddle from './Riddle';
import Puzzle from './Puzzle';
import FinalMessage from './FinalMessage';
import bgMusic from './assets/Taylor Swift - Style.mp3';
import './App.css';

function App() {
  const audioRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const location = useLocation();

  // When route changes, if NOT home, start music if not playing
  useEffect(() => {
    if (location.pathname !== '/' && audioRef.current && !musicPlaying) {
      audioRef.current.currentTime = 0; // 🔁 Reset playback position
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {});
      setMusicPlaying(true);
    }

    if (location.pathname === '/' && audioRef.current) {
      audioRef.current.pause();
      setMusicPlaying(false);
    }
    }, [location, musicPlaying]);

  // Toggle music on/off (for example, passed down or via context)
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play();
      setMusicPlaying(true);
    }
  };

  const setVolume = useCallback((v) => {
  if (audioRef.current) {
    audioRef.current.volume = v;
  }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/birthdaypage"
          element={<BirthdayPage musicPlaying={musicPlaying} toggleMusic={toggleMusic} setVolume={setVolume} />}
        />
        <Route path="/GamesPage" element={<Games />} />
        <Route path="/Riddle" element={<Riddle />} />
        <Route path="/Puzzle" element={<Puzzle />} />
        <Route path="/FinalMessage" element={<FinalMessage />} />
      </Routes>

      {/* Global audio element, hidden */}
      <audio ref={audioRef} loop preload="auto">
        <source src={bgMusic} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
}

export default App;
