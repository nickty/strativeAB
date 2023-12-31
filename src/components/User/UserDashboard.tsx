import React, { useState, useEffect } from "react";
import { getQuestions, addAnswer, getAnswers } from "../../utils/API";
import { Link } from "react-router-dom";

const UserDashboard: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [previousAnswers, setPreviousAnswers] = useState<{
    [key: number]: string[];
  }>({});

  useEffect(() => {
    // Fetch questions on component mount
    setQuestions(getQuestions());

    // Fetch answers from localStorage
    const storedAnswers = getAnswers();
    const answersObj = storedAnswers.reduce((acc: any, answer: any) => {
      const { questionId, answerText } = answer;
      if (!acc[questionId]) {
        acc[questionId] = [];
      }
      acc[questionId].push(answerText);
      return acc;
    }, {});
    setPreviousAnswers(answersObj);
  }, []);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmitAnswer = (questionId: number) => {
    const userAnswer = answers[questionId];
    const prevAnswers = previousAnswers[questionId] || [];
    const updatedAnswers = [...prevAnswers, userAnswer];

    // Update localStorage with the new answer
    addAnswer(questionId, userAnswer);

    setPreviousAnswers({
      ...previousAnswers,
      [questionId]: updatedAnswers,
    });

    // Clear the input after submitting the answer
    setAnswers({
      ...answers,
      [questionId]: "",
    });
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        width: 800,
        margin: "auto",
      }}
    >
      <h2
        style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" }}
      >
        User Dashboard
      </h2>
      <div>
        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
          All Questions
        </h3>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {questions.map((question) => (
            <li key={question.id} style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
                Question: {question.text}
              </div>
              <textarea
                value={answers[question.id] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
                style={{
                  width: "100%",
                  minHeight: "80px",
                  padding: "5px",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                placeholder="Your answer"
              />
              {previousAnswers[question.id] && (
                <div
                  style={{ marginTop: "5px", fontSize: "14px", color: "#888" }}
                >
                  Previous Answers:
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    {previousAnswers[question.id].map((prevAnswer, index) => (
                      <li key={index}>{prevAnswer}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                onClick={() => handleSubmitAnswer(question.id)}
                style={{
                  marginTop: "10px",
                  padding: "5px 10px",
                  fontSize: "14px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Submit Answer
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Link to="/signin">Back To Sign In</Link>{" "}
      </div>
    </div>
  );
};

export default UserDashboard;
