import React, { useState, useEffect } from "react";
import { getQuestions } from "../../utils/API";

const UserDashboard: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    // Fetch questions on component mount
    setQuestions(getQuestions());

    // Simulated previous answers (Replace with actual user answers fetched from API or state)
    setAnswers({
      1: "Previous answer 1",
      2: "Previous answer 2",
      // Add more answers as needed for different questions
    });
  }, []);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmitAnswer = (questionId: number) => {
    // Simulated API call to submit the answer
    console.log(
      `Submitting answer for question ${questionId}: ${answers[questionId]}`
    );
    // You can add logic here to send the answer to the server/API
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>User Dashboard</h2>
      <div>
        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Questions</h3>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {questions.map((question) => (
            <li key={question.id} style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "10px" }}>{question.text}</div>
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
              {answers[question.id] && (
                <div
                  style={{ marginTop: "5px", fontSize: "14px", color: "#888" }}
                >
                  Previous Answer: {answers[question.id]}
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
    </div>
  );
};

export default UserDashboard;
