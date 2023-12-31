import { Answer, Question } from './types';

// Function to fetch questions from localStorage
export const getQuestions = (): Question[] => {
  const storedQuestions = localStorage.getItem('questions');
  return storedQuestions ? JSON.parse(storedQuestions) : [];
};

// Function to add a new question to localStorage
export const addQuestion = (newQuestion: Question) => {
  let storedQuestions = localStorage.getItem('questions');
  const questions = storedQuestions ? JSON.parse(storedQuestions) : [];
  questions.push(newQuestion);
  localStorage.setItem('questions', JSON.stringify(questions));
};

// Function to delete a question from localStorage
export const deleteQuestion = (id: number) => {
  let storedQuestions = localStorage.getItem('questions');
  const questions = storedQuestions ? JSON.parse(storedQuestions) : [];
  const updatedQuestions = questions.filter((question: Question) => question.id !== id);
  localStorage.setItem('questions', JSON.stringify(updatedQuestions));
};

const getQuestionsFromLocalStorage = (): Question[] => {
  const storedQuestions = localStorage.getItem('questions');
  return storedQuestions ? JSON.parse(storedQuestions) : [];
};

const setQuestionsToLocalStorage = (questions: Question[]) => {
  localStorage.setItem('questions', JSON.stringify(questions));
};

// Function to update a specific question in localStorage
export const updateQuestionInLocalStorage = (id: number, updatedText: string) => {
  const storedQuestions = getQuestionsFromLocalStorage();
  const updatedQuestions = storedQuestions.map((question: Question) =>
    question.id === id ? { ...question, text: updatedText } : question
  );
  setQuestionsToLocalStorage(updatedQuestions);
};

// Function to fetch answers for a specific question from localStorage
// export const getAnswersForQuestion = (questionId: number): Answer[] => {
//   const storedAnswers = localStorage.getItem('answers');
//   const answers = storedAnswers ? JSON.parse(storedAnswers) : [];
//   return answers.filter((answer: Answer) => answer.questionId === questionId);
// };

export const addAnswer = (questionId: number, answerText: string) => {
  let storedAnswers = localStorage.getItem('answers');
  const answers = storedAnswers ? JSON.parse(storedAnswers) : [];

  // Generating a new answer object
  const newAnswer = {
    id: answers.length + 1, // Generating a unique ID (Replace this with your logic for generating IDs)
    questionId: questionId,
    answerText: answerText,
  };

  answers.push(newAnswer);
  localStorage.setItem('answers', JSON.stringify(answers));
};

// Function to get answers from localStorage
export const getAnswers = () => {
  const storedAnswers = localStorage.getItem('answers');
  return storedAnswers ? JSON.parse(storedAnswers) : [];
};


// Function to update an existing answer in localStorage
// export const updateAnswer = (updatedAnswer: Answer) => {
//   let storedAnswers = localStorage.getItem('answers');
//   const answers = storedAnswers ? JSON.parse(storedAnswers) : [];
//   const updatedAnswers = answers.map((answer: Answer) =>
//     answer.id === updatedAnswer.id ? updatedAnswer : answer
//   );
//   localStorage.setItem('answers', JSON.stringify(updatedAnswers));
// };

// Function to delete an answer from localStorage
export const deleteAnswer = (id: number) => {
  let storedAnswers = localStorage.getItem('answers');
  const answers = storedAnswers ? JSON.parse(storedAnswers) : [];
  const updatedAnswers = answers.filter((answer: Answer) => answer.id !== id);
  localStorage.setItem('answers', JSON.stringify(updatedAnswers));
};
