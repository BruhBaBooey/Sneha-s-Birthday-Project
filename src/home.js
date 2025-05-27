import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days:'--', hours:'--', minutes:'--', seconds:'--' });
  const [countdownOver, setCountdownOver] = useState(false);

  useEffect(() => {
    const target = new Date('2025-05-28T00:00:00');
    const timerId = setInterval(() => {
      const now = new Date();
      const diff = target - now;
      if(diff <= 0) {
        clearInterval(timerId);
        setTimeLeft({ days:'00', hours:'00', minutes:'00', seconds:'00' });
        setCountdownOver(true);
        return;
      }
      setTimeLeft({
        days: String(Math.floor(diff / (1000*60*60*24))).padStart(2,'0'),
        hours: String(Math.floor((diff / (1000*60*60)) % 24)).padStart(2,'0'),
        minutes: String(Math.floor((diff / (1000*60)) % 60)).padStart(2,'0'),
        seconds: String(Math.floor((diff / 1000) % 60)).padStart(2,'0'),
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div>
      <div className="countdown-top" aria-live="polite" aria-atomic="true" tabIndex={0}>
        <div className="countdown-label">Countdown to Sneha's 17th Birthday</div>
        <div className="countdown-timer">
          <span>{timeLeft.days}d</span> : <span>{timeLeft.hours}h</span> : <span>{timeLeft.minutes}m</span> : <span>{timeLeft.seconds}s</span>
        </div>
      </div>
      <div className="app-container">
        <button
          className="magic-button"
          onClick={() => countdownOver && navigate('/birthdaypage')}
          disabled={!countdownOver}
          style={{ opacity: countdownOver ? 1 : 0.5, cursor: countdownOver ? 'pointer' : 'not-allowed' }}
          aria-label="Unlock the gift"
        >
          <img src="gift.png" alt="Gift" className="gift-icon" />
        </button>
        {!countdownOver && (
          <p className="warning">
            ⏳ The gift unlocks when the countdown reaches zero!
          </p>
        )}
        </div>
    </div>
  );
}
