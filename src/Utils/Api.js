import axios from 'axios';

// Fungsi untuk menunda request selama beberapa waktu
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchQuizQuestions = async (amount = 10, retries = 10, delayMs = 1000) => {
  const endpoint = `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple`;

  for (let i = 0; i < retries; i++) {
    try {
      const { data } = await axios.get(endpoint);
      return data.results;
    } catch (error) {
      if (error.response?.status === 429) {
        console.log('Too many requests, retrying...');
        await delay(delayMs); // Menunggu sebelum melakukan request ulang
      } else {
        throw error; // Jika error lain, lempar kembali
      }
    }
  }
  throw new Error('Failed to fetch questions after retries');
};
