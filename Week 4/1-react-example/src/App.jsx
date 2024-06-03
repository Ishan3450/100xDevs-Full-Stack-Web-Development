import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  function addTodo(title, description) {
    setTodos([...todos, { title: title, description: description }]);
  }

  return (
    <div>
      <button onClick={() => addTodo("Test", "test description")}>
        Add todo
      </button>

      <h1>Todos</h1>
      {todos.map((todo, index) => (
        <div key={index}>
          <h2>{todo.title}</h2>
          <h3>{todo.description}</h3>
          <h3>{new Date().toLocaleTimeString()}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
