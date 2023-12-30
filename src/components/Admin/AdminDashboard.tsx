import React, { useState, useEffect } from "react";
import {
  getQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestionInLocalStorage,
} from "../../utils/API";

const AdminDashboard: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [newQuestionText, setNewQuestionText] = useState<string>("");
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(
    null
  );
  const [updatedQuestionText, setUpdatedQuestionText] = useState<string>("");

  useEffect(() => {
    // Fetch questions on component mount
    setQuestions(getQuestions());
  }, []);

  const handleAddQuestion = () => {
    if (newQuestionText.trim() !== "") {
      const newQuestion = { id: questions.length + 1, text: newQuestionText };
      addQuestion(newQuestion);
      setQuestions([...questions, newQuestion]);
      setNewQuestionText("");
    }
  };

  const handleDeleteQuestion = (id: number) => {
    deleteQuestion(id);
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  };

  const handleEditQuestion = (id: number) => {
    setEditingQuestionId(id);
    const questionToEdit = questions.find((question) => question.id === id);
    if (questionToEdit) {
      setUpdatedQuestionText(questionToEdit.text);
    }
  };

  const handleSaveQuestion = () => {
    if (editingQuestionId !== null && updatedQuestionText.trim() !== "") {
      const updatedQuestions = questions.map((question) =>
        question.id === editingQuestionId
          ? { ...question, text: updatedQuestionText }
          : question
      );
      // Update the question in localStorage
      // updateQuestion(editingQuestionId, updatedQuestionText);
      setQuestions(updatedQuestions);
      setEditingQuestionId(null);
      setUpdatedQuestionText("");
      updateQuestionInLocalStorage(editingQuestionId, updatedQuestionText);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Admin Dashboard
      </h2>
      <div>
        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Questions</h3>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {questions.map((question) => (
            <li
              key={question.id}
              style={{
                marginBottom: "10px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "5px",
              }}
            >
              {editingQuestionId === question.id ? (
                <>
                  <input
                    type="text"
                    value={updatedQuestionText}
                    onChange={(e) => setUpdatedQuestionText(e.target.value)}
                    style={{
                      padding: "5px",
                      fontSize: "14px",
                      marginRight: "10px",
                    }}
                  />
                  <button
                    onClick={handleSaveQuestion}
                    style={{
                      padding: "5px 10px",
                      fontSize: "14px",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span style={{ marginRight: "10px" }}>{question.text}</span>
                  <button
                    onClick={() => handleEditQuestion(question.id)}
                    style={{
                      padding: "5px 10px",
                      fontSize: "14px",
                      backgroundColor: "#ffc107",
                      color: "#000",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(question.id)}
                    style={{
                      padding: "5px 10px",
                      fontSize: "14px",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Enter new question"
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
          style={{
            padding: "5px",
            fontSize: "14px",
            marginBottom: "10px",
          }}
        />
        <button
          onClick={handleAddQuestion}
          style={{
            padding: "5px 10px",
            fontSize: "14px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Question
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
