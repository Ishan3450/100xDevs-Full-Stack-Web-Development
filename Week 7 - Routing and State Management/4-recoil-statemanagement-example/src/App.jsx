import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { countAtom, evenSelector } from "./store/atoms/count";

function App() {
  return (
    // anything which uses any thing related Recoil must be wrapped around RecoilRoot
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  );
}

function Counter() {
  const [count, setCount] = useRecoilState(countAtom); // useRecoilState is same as useState
  // const count = useRecoilValue(countAtom); // useRecoilValue is same as [count, ] the count
  // const setCount = useSetRecoilState(countAtom); // useSetRecoilState is same as [, setCount] setCount fuction

  const isCountEven = useRecoilValue(evenSelector);
  return (
    <div>
      {count} <br />
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <button onClick={() => setCount((prev) => prev - 1)}>Decrement</button>
      <br />
      {isCountEven ? "Count is Odd" : "Count is Even"}
    </div>
  );
}

export default App;
