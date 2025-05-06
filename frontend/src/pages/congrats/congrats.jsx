import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './congrats.css';
import confetti from 'canvas-confetti';

function Congrats() {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="congrats-container">
      <div className="congrats-card">
        <h1>🎉 Congratulations!</h1>
        <p>Your booking was successful. Get ready for an amazing experience!</p>
        <Link to="/" className="home-button">Return Home</Link>
      </div>
    </div>
  );
}

export default Congrats;