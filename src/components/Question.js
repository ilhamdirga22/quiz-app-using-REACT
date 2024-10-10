import React from 'react';
import './App.css';

const Question = ({ questionData, handleAnswerSelection }) => {
  const { question, correct_answer, incorrect_answers } = questionData;
  
  const answers = [...incorrect_answers, correct_answer].sort();

  const handleAnswerClick = (answer) => {
    handleAnswerSelection(answer === correct_answer);
  };

  return (
    <div className="question-container">
      <h3>{question}</h3>
      {answers.map((answer, index) => (
        <button 
          key={index} 
          className="answer-button"
          onClick={() => handleAnswerClick(answer)}
        >
          {answer}
        </button>
      ))}
    </div>
  );
};

export default Question;

