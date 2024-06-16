import { useState, memo, useCallback } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  // * see the browser console for better understanding

  // * useCallback returns a function
  // * using callback helps to maintain the same reference pointer when the dependency is not changed, if the dependency is changed then at the time of re-rendering the function within the useCallback will be re-rendered again
  // * the function passed in useCallback is not called, it's reference is just changed, like here in this case just reference will be changed not the console.log will be printed, it will be printed where the inputFunction gets called
  const inputFunction = useCallback(function () {
    console.log("helloo");
  }, []);

  // * if below function without callback is passed then even with memo the componenet will be re-rendered because every time this App component rerenders inputFunction will have a different reference pointer
  // function inputFunction() {
  //   console.log("helloo");
  // }

  return (
    <>
      <Component inputFunction={inputFunction} />
      <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
    </>
  );
}

const Component = memo(function ({ inputFunction }) {
  console.log("Component rendered");

  return <div>Hey there</div>;
});

export default App;
