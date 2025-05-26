import { Routes, Route } from 'react-router-dom';
import Home from './home';
import BirthdayPage from './BirthdayPage';
import Games from './GamesPage';
import Riddle from './Riddle'
import Puzzle from './Puzzle';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/birthdaypage" element={<BirthdayPage />} />
      <Route path="/GamesPage" element={<Games />} />
      <Route path="/Riddle" element={<Riddle />} />
      <Route path="/Puzzle" element={<Puzzle />} />
      {/* other routes */}
    </Routes>
  );
}

export default App;
