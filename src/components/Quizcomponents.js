import React, { useEffect, useState } from 'react';
import { fetchQuizQuestions } from './Utils/Api';

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const fetchedQuestions = await fetchQuizQuestions(10);
        setQuestions(fetchedQuestions);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>{question.question}</div>
      ))}
    </div>
  );
};

export default QuizComponent;
