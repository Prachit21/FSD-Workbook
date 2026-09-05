import React, { useState } from 'react';

export default function CounterApp() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button onClick={() => setCount(c => c - 1)}>Decrement</button>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type..."
      />
      <p>Typed: {text}</p>
    </div>
  );
}