import { useState } from 'react';
import Flashcard from './components/Flashcard';
import './App.css';

function App() {
  // Initial set of flashcards
  const initialCards = [
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
  ];

  // State to store and manage flashcards
  const [shuffledCards, setShuffledCards] = useState([...initialCards]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // State to store user input and feedback
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(null); // 'correct' or 'incorrect'

  // State for tracking answer streaks
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  // State to track mastered cards
  const [masteredCards, setMasteredCards] = useState([]);

  // Normalize strings to improve matching (remove case & punctuation)
  const normalize = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]/gi, "").trim();

  // Fuzzy matching: checks if guess is contained in answer or vice versa
  const isFuzzyMatch = (guess, answer) => {
    const g = normalize(guess);
    const a = normalize(answer);
    return g.includes(a) || a.includes(g);
  };

  // Handle guess submission
  const handleSubmit = () => {
    const guess = userInput;
    const answer = shuffledCards[currentIndex].answer;

    if (isFuzzyMatch(guess, answer)) {
      setFeedback("correct");
      updateStreak(true);
    } else {
      setFeedback("incorrect");
      updateStreak(false);
    }
  };

  // Update current and longest streak
  const updateStreak = (isCorrect) => {
    if (isCorrect) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
    } else {
      setCurrentStreak(0);
    }
  };

  // Go to the next card if not at the end
  const handleNext = () => {
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput("");
      setFeedback(null);
    }
  };

  // Go to the previous card if not at the beginning
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserInput("");
      setFeedback(null);
    }
  };

  // Shuffle the flashcards and reset state
  const shuffleCards = () => {
    const shuffled = [...shuffledCards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentIndex(0);
    setUserInput("");
    setFeedback(null);
  };

  // Mark a card as mastered and remove it from the active pool
  const markAsMastered = () => {
    const currentCard = shuffledCards[currentIndex];
    setMasteredCards([...masteredCards, currentCard]);

    const remaining = shuffledCards.filter((_, i) => i !== currentIndex);
    setShuffledCards(remaining);

    // Set next index carefully to avoid going out of bounds
    const nextIndex = Math.min(currentIndex, remaining.length - 1);
    setCurrentIndex(nextIndex);
    setUserInput("");
    setFeedback(null);
  };

  return (
    <div className="App">
      <h1>Computer Science Trivia</h1>
      <p>Test your CS knowledge with these trivia flashcards!</p>
      <p>Total cards: {shuffledCards.length}</p>
      <p>📘 Mastered Cards: {masteredCards.length}</p>

      {/* Flashcard component */}
      {shuffledCards.length > 0 ? (
        <Flashcard card={shuffledCards[currentIndex]} />
      ) : (
        <p>🎉 You've mastered all the cards!</p>
      )}

      {/* User input section */}
      {shuffledCards.length > 0 && (
        <>
          <div className="input-section">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your answer"
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>

          {/* Feedback for user's guess */}
          {feedback === "correct" && <p className="correct">✅ Correct!</p>}
          {feedback === "incorrect" && <p className="incorrect">❌ Try again.</p>}

          {/* Streak display */}
          <p>🔥 Current Streak: {currentStreak}</p>
          <p>🏆 Longest Streak: {longestStreak}</p>

          {/* Navigation buttons */}
          <div className="nav-buttons">
            <button onClick={handleBack} disabled={currentIndex === 0}>
              ⬅️ Back
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === shuffledCards.length - 1}
            >
              ➡️ Next
            </button>
          </div>

          {/* Stretch feature buttons */}
          <button onClick={shuffleCards}>🔀 Shuffle Cards</button>
          <button onClick={markAsMastered}>✅ Mark as Mastered</button>
        </>
      )}
    </div>
  );
}

export default App;
