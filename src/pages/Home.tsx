import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    textAlign: "center",
    marginTop: "100px",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "32px",
    color: "#333",
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#666",
    marginTop: "20px",
  };
  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Welcome to the Quiz App For Strativ AB</h2>
      <p style={paragraphStyle}>
        This app is created with React, Typescript, LocalStorage
      </p>
      <p>
        <Link to="/signin">Sign In</Link>{" "}
      </p>
    </div>
  );
};

export default Home;
