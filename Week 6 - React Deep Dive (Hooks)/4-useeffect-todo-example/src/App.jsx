import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [id, setId] = useState(1);

  function changeId(event) {
    setId(event.target.innerText);
  }

  return (
    <>
      <button onClick={changeId}>1</button>
      <button onClick={changeId}>2</button>
      <button onClick={changeId}>3</button>
      <button onClick={changeId}>4</button>

      <Todo id={id} />
    </>
  );
}

function Todo({ id }) {
  const [todo, setTodo] = useState([]);

  useEffect(
    function () {
      fetch(`https://sum-server.100xdevs.com/todo?id=${id}`).then(
        async function (response) {
          const parsed = await response.json();
          setTodo(parsed.todo);
        }
      );
    },
    [id]
  );

  return (
    <div>
      <h1>{todo.title}</h1>
      <h2>{todo.description}</h2>
    </div>
  );
}

export default App;
