import React, { useState } from 'react';
import axios from 'axios';

function Summarize() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/summarize', { text });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Summarization failed:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSummarize}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Summarize</button>
      </form>
      {summary && <p>{summary}</p>}
    </div>
  );
}

export default Summarize;
