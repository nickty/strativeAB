import React, { useState, useEffect } from "react";
import { getQuestions } from "../utils/API"; // Assuming a function to retrieve questions

interface Question {
  id: number;
  text: string;
}

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Fetch questions on component mount
    const fetchedQuestions = getQuestions(); // Replace with your function to fetch questions
    setQuestions(fetchedQuestions);
  }, []);

  return (
    <div>
      <h2>Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {question.text}
            {/* Add functionality to answer questions */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
