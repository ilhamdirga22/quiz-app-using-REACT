import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Results = ({ score, totalQuestions }) => {
  const navigate = useNavigate();
  
  const restartQuiz = () => {
    localStorage.removeItem('quizProgress');
    navigate('/quiz');
  };

  return (
    <div className="container results">
      <h2>Quiz Completed!</h2>
      <p>Correct Answers: {score}</p>
      <p>Total Questions: {totalQuestions}</p>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default Results;
