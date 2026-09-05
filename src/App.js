import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Home Page</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About Page</h2>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}