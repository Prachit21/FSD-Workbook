import { UserCard } from "./UserCard";

export default function App() {
  return (
    <UserCard
      name="Prachit"
      role="Developer"
      skills={["React", "JS"]}
    />
  );
}