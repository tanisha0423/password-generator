import { useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(false);
  const [includeLower, setIncludeLower] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const calculateStrength = (pwd) => {
    if (!pwd) return "";

    let score = 0;

    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return "Weak";
    if (score === 3 || score === 4) return "Medium";
    return "Strong";
  };

  const generatePassword = () => {
    let chars = "";

    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+[]{}";

    if (!chars) {
      alert("Please select at least one option.");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(newPassword);
    setStrength(calculateStrength(newPassword));
  };

  return (
    <div className="app-wrapper">
      <div className="content-container">

        {/* Title Section */}
        <div className="title-box">
          <h1>Password Generator</h1>
          <p>Create secure and customizable passwords instantly.</p>
        </div>

        {/* Generator Card */}
        <div className="generator-box">

          <div className="slider-section">
            <label>Password Length: {length}</label>
            <input
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="checkbox-section">
            <label>
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={() => setIncludeUpper(!includeUpper)}
              />
              Uppercase
            </label>

            <label>
              <input
                type="checkbox"
                checked={includeLower}
                onChange={() => setIncludeLower(!includeLower)}
              />
              Lowercase
            </label>

            <label>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
              />
              Numbers
            </label>

            <label>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
              />
              Symbols
            </label>
          </div>

          <button onClick={generatePassword} className="generate-btn">
            Generate Password
          </button>

          <div className="result-section">
            <p className="password">
              {password || "Your password will appear here"}
            </p>
            <p className="strength">
              {strength ? `Strength: ${strength}` : ""}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
