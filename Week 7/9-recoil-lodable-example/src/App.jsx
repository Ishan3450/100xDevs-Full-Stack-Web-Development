import { RecoilRoot, useRecoilValue, useRecoilValueLoadable } from "recoil";
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
  const todo = useRecoilValueLoadable(todosSelectorFamily(id));
  // log below statement to know what lodable object returns and how it works
  // console.log(JSON.stringify(todo));

  if (todo.state === "loading") {
    return <h1>Loading....</h1>;
  } else if (todo.state === "hasValue") {
    return (
      <>
        <h4>{todo.contents.id}</h4>
        <h1>{todo.contents.title}</h1>
        <h3>{todo.contents.description}</h3>
      </>
    );
  } else if(todo.state === "hasError") {
    return <h1>Error...</h1>
  } 
}

export default App;
