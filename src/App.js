import React from "react";

function UserCard({ name, role, skills }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        margin: "20px auto",
        width: "350px",
        textAlign: "center",
        fontFamily: "Arial",
      }}
    >
      <h2>{name}</h2>
      <h3>{role}</h3>

      <h4>Skills</h4>
      <ul style={{ listStylePosition: "inside" }}>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        React Components and Props
      </h1>

      <UserCard
        name="Prachit Brahmbhatt"
        role="BCA Honours Student"
        skills={["React.js", "Python", "Data Analytics"]}
      />
    </div>
  );
}

export default App;