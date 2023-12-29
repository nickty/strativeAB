import React, { useState, useEffect } from "react";
import { getAnswersForQuestion } from "../utils/API"; // Assuming a function to retrieve answers

interface Answer {
  id: number;
  userId: number;
  answerText: string;
}

const Answers: React.FC = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    // Fetch answers for a specific question (Replace questionId with actual ID)
    const questionId = 1; // Replace with the ID of the question
    const fetchedAnswers = getAnswersForQuestion(questionId);
    setAnswers(fetchedAnswers);
  }, []);

  return (
    <div>
      <h2>Answers for Question</h2>
      <ul>
        {answers.map((answer) => (
          <li key={answer.id}>
            User {answer.userId} answered: {answer.answerText}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Answers;
