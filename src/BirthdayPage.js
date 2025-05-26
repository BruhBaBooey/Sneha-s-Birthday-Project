import React, { useState, useEffect, useRef } from 'react';
import photo from './assets/sneha.jpg';
import bgMusic from './assets/Taylor Swift - Style.mp3';
import './BirthdayPage.css'
import './Home.css'
import { useNavigate } from 'react-router-dom';

export default function BirthdayPage() {
    const [balloons, setBalloons] = useState([]);
    const [musicPlaying, setMusicPlaying] = useState(false);
    const confettiRef = useRef(null);
    const sparklesRef = useRef(null);
    const audioRef = useRef(null);
    const [timeLeft, setTimeLeft] = useState({ days:'--', hours:'--', minutes:'--', seconds:'--' });
    const [, setCountdownOver] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const target = new Date('2025-05-25T00:00:00');
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

    // Confetti launch
    const launchConfetti = () => {
        if(!confettiRef.current) return;
        const colors = ['#FF9AD3','#FFA1A1','#FFB2E9', '#FDB9DB', '#FF6D91'];
        const container = confettiRef.current;
        container.innerHTML = '';
        for(let i=0; i<600; i++){
        const div = document.createElement('div');
        div.className = 'confetti-piece';
        div.style.backgroundColor = colors[i % colors.length];
        div.style.top = (Math.random() * 20) + 'vh';
        div.style.left = Math.random()*100 + 'vw';
        const size = 5 + Math.random() * 7;
        div.style.width = size + 'px';
        div.style.height = size + 'px';
        div.style.animationDuration = (3 + Math.random()*2) + 's';
        div.style.animationDelay = Math.random()*0.7 + 's';
        container.appendChild(div);
        div.addEventListener('animationend', () => div.remove());
        }
    };

    // Balloons launch
    const launchBalloons = () => {
        const colors = ['#FF69B4', '#FFD700', '#87CEFA', '#FFA07A', '#98FB98'];
        const newBalloons = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * 100,
        size: 40 + Math.random() * 30,
        delay: Math.random() * 2,
        }));
        setBalloons(newBalloons);
    };

    // Sparkles launch
    const launchSparkles = () => {
        if (!sparklesRef.current) return;
        const colors = ['#ffc0d8', '#ffd6e8', '#ffeaf5'];
        for (let i = 0; i < 60; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle sparkle-animate';
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = 2 + Math.random() * 2;
        const delay = Math.random() * 7;
        sparkle.style.left = left + 'vw';
        sparkle.style.top = top + 'vh';
        sparkle.style.width = sparkle.style.height = size + 'px';
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.animationDelay = delay + 's';
        sparklesRef.current.appendChild(sparkle);
        sparkle.addEventListener('animationend', () => sparkle.remove());
        }
    };

    useEffect(() => {
        launchConfetti();
        launchBalloons();
        launchSparkles();
        if(audioRef.current){
        audioRef.current.volume = 0.6;
        audioRef.current.play().catch(err => console.warn('Audio play failed:', err));
        setMusicPlaying(true);
        }
    }, []);

    const toggleMusic = () => {
    if(!audioRef.current) return;
    if(musicPlaying){
        audioRef.current.pause();
        setMusicPlaying(false);
    } else {
        audioRef.current.play();
        setMusicPlaying(true);
    }
    // Remove focus to allow hover animation again
    document.activeElement.blur();
    };


    return (
        <div>
        <div className="countdown-top" aria-live="polite" aria-atomic="true" tabIndex={0}>
            <div className="countdown-label">Countdown to Sneha's 17th Birthday</div>
            <div className="countdown-timer">
            <span>{timeLeft.days}d</span> : <span>{timeLeft.hours}h</span> : <span>{timeLeft.minutes}m</span> : <span>{timeLeft.seconds}s</span>
            </div>
            <button onClick={toggleMusic} className="music-toggle" aria-pressed={musicPlaying}>
            {musicPlaying ? '🔊' : '🔇'}
            </button>
        </div>
        <div className="app-container enhanced-bg">
            <div ref={confettiRef} className="confetti-wrapper" aria-hidden="true" />
            <div className="balloons-wrapper">
                {balloons.map((balloon) => (
                <div key={balloon.id} className="balloon-float" style={{left: `${balloon.left}%`, animationDelay: `${balloon.delay}s`, animationDuration: `${10 + Math.random() * 8}s`}}>
                <div className="tail" />
                <div className="balloon" style={{ backgroundColor: balloon.color, width: `${balloon.size}px`, height: `${balloon.size * 1.2}px` }} />
            </div>
                ))}
            </div>
            <div ref={sparklesRef} className="sparkles-wrapper" aria-hidden="true" />
            <h1 className="main-title glow-text">🎉 Happy 17th Birthday Sneha !! 🎉</h1>
            <div className="about-section">
                <div className="poem" aria-live="polite" tabIndex={0}>
                {[
                    "It’s been just a year — not that long,",
                    "But somehow it feels like we’ve been friends all along.",
                    "You love your novels — Agatha’s the queen,",
                    "Plot twists so wild, they belong on the screen.",
                    "While I’m halfway lost by page twenty-two,",
                    "You’re solving crimes like, “Too easy, boo.” 😎🔍",
                    "Taylor Swift’s always looping in your mind,",
                    "And every now and then, that one track plays...",
                    <>You’ve got that look — <em>like you never go out of Style</em> 😉🎶</>,
                    "And sleep? Oh please — your ride or die,",
                    "If napping were a sport, you’d qualify. 😴💤",
                    "Then there’s lab practicals, oh what a ride,",
                    "Us pretending we’ve got reactions under control (we lied).",
                    "Panic, notes, and that last-minute cram —",
                    "But we passed, somehow — thank the exam.",
                    "I’m just glad we met — honestly, truly,",
                    "Class is better with you — fun and unruly.",
                    "Best classmate ever — that’s you, not me. 💫"
                ].map((line, i) => (
                    <p key={i} className="glow-text fade-in" style={{ animationDelay: 1 + i * 0.3 + 's' }}>{line}</p>
                ))}
                </div>
                <div className="sneha-photo" tabIndex={0} role="region" aria-label="Sneha Pradhan's photo">
                <img src={photo} alt="Sneha" style={{ width: '390px', height: 'auto', borderRadius: '10px' }} />
                </div>
            </div>
            <button className="continue-button" onClick={() => navigate('/GamesPage')} aria-label="Go to games page">
                Let's Continue
            </button>
            <audio ref={audioRef} loop preload="auto">
                <source src={bgMusic} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
        </div>
    );
}
