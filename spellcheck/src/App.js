import React, { useState, useEffect } from 'react';
import './App.css';

const customDictionary = {
  teh: "the",
  wrok: "work",
  fot: "for",
  exampl: "example"
};

function App() {
  const [text, setText] = useState("");
  const [suggestedText, setSuggestedText] = useState("");

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);
  };

  useEffect(() => {
    const words = text.split(" ");
    const correctedWords = words.map((word) => {
      const correctedWord = customDictionary[word.toLowerCase()];
      return correctedWord || word;
    });

    const firstCorrection = correctedWords.find(
      (word, idx) => word !== words[idx]
    );

    setSuggestedText(firstCorrection || "");
  }, [text]); // Run this effect whenever 'text' changes

  return (
    <div>
      <h1>Spell Check and Auto-Correction</h1>
      <textarea
        value={text}
        onChange={handleInputChange}
        placeholder='Enter text...'
        rows={5}
        cols={40}
      />
      {suggestedText && (
        <p>Did you mean: <strong>{suggestedText}</strong></p>
      )}
    </div>
  );
}

export default App;