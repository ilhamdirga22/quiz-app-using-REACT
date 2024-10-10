import React, { useState, useEffect } from 'react';
import { fetchQuizQuestions } from '../Utils/Api';
import Question from './Question';
import Results from './Results';
import './App.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(120);  
  const [isCompleted, setIsCompleted] = useState(false);
  const [username, setUsername] = useState(''); 

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || 'Guest'); 
  }, []);

  useEffect(() => {
    const loadQuestions = async () => {
      const savedQuestions = JSON.parse(localStorage.getItem('quizProgress'));

      if (savedQuestions) {
        setQuestions(savedQuestions.questions);
        setCurrentQuestion(savedQuestions.currentQuestion);
        setScore(savedQuestions.score);
        setTimer(savedQuestions.timer);
      } else {
        const newQuestions = await fetchQuizQuestions(5);
        setQuestions(newQuestions);
        localStorage.setItem('quizProgress', JSON.stringify({ questions: newQuestions, currentQuestion: 0, score: 0, timer: 60 }));
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setIsCompleted(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAnswerSelection = (isCorrect) => {
    const updatedScore = isCorrect ? score + 1 : score;
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setScore(updatedScore);
      localStorage.setItem('quizProgress', JSON.stringify({ questions, currentQuestion: nextQuestion, score: updatedScore, timer }));
    } else {
      setIsCompleted(true);
    }
  };

  if (isCompleted) {
    return <Results score={score} totalQuestions={questions.length} />;
  }

  return (
    <div className="container">
      <h2>Welcome, {username}!</h2>
      <h3>Quiz Time</h3>
      <p className="timer">Time left: {timer}s</p>

      <div className="quiz-info">
        <p>Total Soal: {questions.length}</p>
        <p>Soal yang Dikerjakan: {currentQuestion + 1}/{questions.length}</p>
      </div>

      {questions.length > 0 && (
        <Question 
          questionData={questions[currentQuestion]} 
          handleAnswerSelection={handleAnswerSelection}
        />
      )}
    </div>
  );
};

export default Quiz;
