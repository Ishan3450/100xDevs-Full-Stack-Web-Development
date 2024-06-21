import { useState } from "react";
import "./App.css";
import useCursorPosition from "./hooks/useCursorPosition";
import useIsOnline from "./hooks/useIsOnline";
import useTodo from "./hooks/useTodo";
import useDebounce from "./hooks/useDebounce";

function App() {
  // const { todos, loading } = useTodo();
  // const isOnline = useIsOnline();
  // const position = useCursorPosition();

  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 0.5);

  return (
    <>
      {/* <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          todos.map((todo) => <TodoItem key={todo.id} info={todo} />)
        )}
      </div> */}

      {/* <div>Status: {isOnline ? "Online" : "Offline"}</div> */}

      {/* <div>
        {position.x} : {position.y}
      </div> */}

      <input type="text" onChange={(e) => setValue(e.target.value)} />
      <div>Debounced value: {debouncedValue}</div>
    </>
  );
}

function TodoItem({ info }) {
  return (
    <div>
      <h3>{info.title}</h3>
      <h4>{info.description}</h4>
    </div>
  );
}

export default App;
