import "./App.css";
import { RecoilRoot, useRecoilValue } from "recoil";
import {todosFamily} from "./recoil/atomFamily";

function App() {
  return (
    <>
      <RecoilRoot>
        <Todo id={1} />
        <Todo id={2} />
      </RecoilRoot>
    </>
  );
}

function Todo({ id }) {
  const todo = useRecoilValue(todosFamily(id));

  return (
    <>
      <h4>{todo.id}</h4>
      <h1>{todo.title}</h1>
      <h3>{todo.description}</h3>
    </>
  );
}

export default App;
