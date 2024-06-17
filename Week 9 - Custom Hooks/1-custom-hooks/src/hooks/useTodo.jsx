import { useState, useEffect } from "react";

function useTodo() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  function getData() {
    fetch("https://sum-server.100xdevs.com/todos").then(async (response) => {
      const data = await response.json();

      setTodos(data.todos);
      setLoading(false);
    });
  }

  useEffect(() => {
    const serverPolling = setInterval(() => {
      getData();
    }, 10000);

    getData();

    return () => {
      clearInterval(serverPolling);
    };
  }, []);

  return { todos, loading };
}

export default useTodo;
