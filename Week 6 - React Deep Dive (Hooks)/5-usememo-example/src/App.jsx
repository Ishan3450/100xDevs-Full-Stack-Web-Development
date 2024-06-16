import { useMemo, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);

  function handleTextChange(event) {
    setNumber(event.target.value);
  }

  /* *** */
  // * useMemo returns a value
  // * in useMemo we can return and store a thing like we returned sum in below useMemo hook
  // * useMemo helps to reduce a state variable
  const sum = useMemo(() => {
    let sum = 0;
    for (let i = 1; i <= number; i++) {
      sum += i;
    }
    return sum;
  }, [number]);

  return (
    <>
      <input type="text" onChange={handleTextChange} />
      <h2>
        Sum till {number} is {sum}
      </h2>
      <button onClick={() => setCount(count + 1)}>Counter ({count})</button>
    </>
  );
}

export default App;
