import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Home from "./Home";
import TermOfUse from "./pages/TermOfUse";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <nav className="navbar">
          <Link to="/" className="nav-link">
            ホーム
          </Link>
          <Link to="/privacy-policy" className="nav-link">
            プライバシーポリシー
          </Link>
          <Link to="/term-of-use" className="nav-link">
            利用規約
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/term-of-use" element={<TermOfUse />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
