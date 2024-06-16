import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
