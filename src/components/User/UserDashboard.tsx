import React, { useState, useEffect } from "react";
import { getQuestions, addAnswer, getAnswers } from "../../utils/API";

const UserDashboard: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    // Fetch questions on component mount
    setQuestions(getQuestions());

    const storedAnswers = getAnswers();
    const answersObj = storedAnswers.reduce((acc: any, answer: any) => {
      const { questionId, answerText } = answer;
      if (!acc[questionId]) {
        acc[questionId] = [];
      }
      acc[questionId].push(answerText);
      return acc;
    }, {});
    setAnswers(answersObj);
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
    addAnswer(questionId, answers[questionId]);
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
              {Array.isArray(answers[question.id]) && (
                <div
                  style={{ marginTop: "5px", fontSize: "14px", color: "#888" }}
                >
                  Previous Answers:
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    {Array.isArray(answers[question.id]) &&
                      //@ts-ignore
                      answers[question.id].map((prevAnswer, index) => (
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
    </div>
  );
};

export default UserDashboard;
