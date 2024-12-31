import { useState } from "react";

function CreateTodo({ setTodos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function addTodo() {
    const todo = { title: title, description: description };

    const response = await fetch("http://localhost:3000/add-todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, description: description }),
    });

    const parsed = await response.json();
    alert(parsed.message); // .message comes from the backend res.json() 
  }

  return (
    <div>
      <input
        type="text"
        placeholder="todo title"
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="todo description"
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <br />
      <br />

      <button onClick={addTodo}>Add as todo</button>
    </div>
  );
}

export default CreateTodo;
