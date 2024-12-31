function Todos({ todos }) {
  return (
    <div>
      {todos.map(function (todo, index) {
        return (
          <div key={index}>
            <h2>{todo.title}</h2>
            <h4>{todo.description}</h4>
            <h3>
              {todo.completed ? "Completed" : <buttom>Mark as complete</buttom>}
            </h3>
          </div>
        );
      })}
    </div>
  );
}

export default Todos;
