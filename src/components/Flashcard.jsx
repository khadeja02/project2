import { useState, useEffect } from 'react';
import './Flashcard.css';

function Flashcard({ card }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state whenever a new card is passed in
  useEffect(() => {
    setIsFlipped(false);
  }, [card]);

  const handleClick = () => setIsFlipped(!isFlipped);

  return (
    <div
      className={`flashcard ${isFlipped ? 'flipped' : ''} ${card.category.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={handleClick}
    >
      <div className="flashcard-content">
        {card.image && <img src={card.image} alt={card.question} className="card-image" />}
        <p>{isFlipped ? card.answer : card.question}</p>
      </div>
    </div>
  );
}

export default Flashcard;
