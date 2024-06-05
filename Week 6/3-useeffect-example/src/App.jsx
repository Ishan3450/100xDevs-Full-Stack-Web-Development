import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(function () {
    async function getTodos() {
      const response = await fetch("https://sum-server.100xdevs.com/todos");
      const parsedData = await response.json();
      setTodos(parsedData.todos);
    }

    setInterval(getTodos, 10000);
    // getTodos();
  }, []);

  return (
    <>
      {todos.map(function (todo) {
        return (
          <div key={todo.id}>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
          </div>
        );
      })}
    </>
  );
}

export default App;
