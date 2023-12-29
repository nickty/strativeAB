import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const containerStyle: React.CSSProperties = {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "40px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
  };

  const inputStyle: React.CSSProperties = {
    marginBottom: "20px",
    padding: "10px",
    fontSize: "16px",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const handleSignIn = (e: any) => {
    e.preventDefault();
    // Handle sign-in logic
    const isAdmin = username === "admin" && password === "admin";

    console.log("are you", isAdmin);

    if (isAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Sign In</h2>
      <form style={formStyle}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleSignIn} style={buttonStyle}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
