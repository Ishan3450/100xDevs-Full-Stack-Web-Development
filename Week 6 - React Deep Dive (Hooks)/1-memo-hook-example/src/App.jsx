import { useState, memo } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");

  function changeTitle() {
    setTitle(`Title changed to ${Math.random()}`);
  }
  return (
    <div>
      <button onClick={changeTitle}>Change title</button>
      <TestComponent title={title} />
      <TestComponent title="Static title" />
      <TestComponent title="Static title" />
      <TestComponent title="Static title" />
      <TestComponent title="Static title" />
      <TestComponent title="Static title" />
      <TestComponent title="Static title" />
    </div>
  );
}

const TestComponent = memo(function ({ title }) {
  return (
    <div>
      <h1>Title is {title}</h1>
    </div>
  );
});

export default App;
