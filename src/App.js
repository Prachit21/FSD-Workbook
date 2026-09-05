import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export default function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Display />
    </ThemeContext.Provider>
  );
}

function Display() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div
      style={{
        background: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000'
      }}
    >
      <p>Current Theme: {theme}</p>

      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle
      </button>
    </div>
  );
}