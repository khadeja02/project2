import { useState } from 'react';
import Flashcard from './components/Flashcard';
import './App.css';

function App() {
  const cardSet = {
    title: "Computer Science Trivia",
    description: "Test your CS knowledge with these trivia flashcards!",
    cards: [
     {
    question: "What does CPU stand for?",
    answer: "Central Processing Unit",
    image: "https://i.insider.com/60402d82b46d720018b04c1d?width=1200&format=jpeg",
    category: "Hardware"
  },
  {
    question: "What is the time complexity of binary search?",
    answer: "O(log n)",
    image: "https://adrianmejia.com/images/time-complexity-examples.png",
    category: "Algorithms"
  },
  {
    question: "What language is React written in?",
    answer: "JavaScript",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    category: "Web Dev"
  },
  {
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
    category: "Web Dev"
  },
  {
    question: "What year was Java released?",
    answer: "1995",
    image: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
    category: "Languages"
  }
    ]
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const randomIndex = Math.floor(Math.random() * cardSet.cards.length);
    setCurrentIndex(randomIndex);
  };

  return (
    <div className="App">
      <h1>{cardSet.title}</h1>
      <p>{cardSet.description}</p>
      <p>Total cards: {cardSet.cards.length}</p>

      <Flashcard card={cardSet.cards[currentIndex]} />
      <button onClick={handleNext}>Next Card</button>
    </div>
  );
}

export default App;


