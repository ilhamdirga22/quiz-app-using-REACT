import axios from 'axios';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchQuizQuestions = async (amount = 10, retries = 5, delayMs = 1000) => {
  const endpoint = `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple`;

  for (let i = 0; i < retries; i++) {
    try {
      const { data } = await axios.get(endpoint);
      
      if (data && data.results) {
        return data.results; 
      }
      
      throw new Error('No results found');

    } catch (error) {
      if (error.response?.status === 429) {
        console.log('Too many requests, retrying...');
        await delay(delayMs);
      } else {
        console.error(`Error fetching quiz questions: ${error.message}`);
        break;
      }
    }
  }
  
  throw new Error('Failed to fetch questions after retries');
};

