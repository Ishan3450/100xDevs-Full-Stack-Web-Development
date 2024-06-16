import { RecoilRoot, useRecoilValue } from "recoil";
import "./App.css";
import { todosSelectorFamily } from "./recoil/atoms";

function App() {
  return (
    <RecoilRoot>
      <Todo id={1} />
      <Todo id={2} />
    </RecoilRoot>
  );
}

function Todo({ id }) {
  const todo = useRecoilValue(todosSelectorFamily(id));
  return (
    <>
      <h4>{todo.id}</h4>
      <h1>{todo.title}</h1>
      <h3>{todo.description}</h3>
    </>
  );
}

export default App;
