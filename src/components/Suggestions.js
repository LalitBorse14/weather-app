import React from 'react';

const Suggestions = ({ suggestions, handleSuggestionClick }) => (
  <ul className="suggestions">
    {suggestions.map((s, i) => (
      <li key={i} onClick={() => handleSuggestionClick(s)}>{s}</li>
    ))}
  </ul>
);

export default Suggestions;