import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
