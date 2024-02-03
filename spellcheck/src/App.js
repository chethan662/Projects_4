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

  useEffect(() => {
    const words = text.split(" ");

    let firstCorrection = "";

    words.some((word) => {
      const correctedWord = customDictionary[word.toLowerCase()];
      if (correctedWord && correctedWord !== word) {
        firstCorrection = correctedWord;
        return true;
      }
      return false;
    });

    setSuggestedText(firstCorrection);
  }, [text]);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);
  };

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
        <p>Did you mean: <strong>{suggestedText}</strong>?</p>
      )}
    </div>
  );
}

export default App;