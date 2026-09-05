export function UserCard({ name, role, skills }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Role: {role}</p>
      <ul>
        {skills.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}