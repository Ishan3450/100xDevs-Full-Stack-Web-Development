const express = require("express");
const app = express();
const { addTodoSchema, completeTodoSchema } = require("./types");
const { todoModel } = require("./db/db");
const cors = require("cors");

app.use(express.json());
// app.use(cors({origin: "http://localhost:5173/",})); // allow only from particular url
app.use(cors()); // allow from anywhere

app.post("/add-todo", async function (req, res) {
  const title = req.body.title;
  const description = req.body.description;

  const todo = {
    title: title,
    description: description,
    completed: false,
  };

  const validationResponse = addTodoSchema.safeParse(todo);

  if (!validationResponse.success) {
    res
      .status(411)
      .json({ message: "Input validation failed", error: validationResponse });
    return;
  }

  await todoModel.create(todo);

  res.status(200).json({
    message: "Todo created.",
  });
});

app.get("/get-todos", async function (req, res) {
  const allTodos = await todoModel.find({});
  res.status(200).json({
    todos: allTodos,
  });
});

app.put("/completed", async function (req, res) {
  const todoId = req.body.todoId;
  const validationResponse = completeTodoSchema.safeParse({
    id: todoId,
  });

  if (!validationResponse.success) {
    res.status(411).json({ message: "Wrong todo ID" });
    return;
  }

  await todoModel.updateOne(
    {
      _id: todoId,
    },
    {
      completed: true,
    }
  );

  res.status(200).json({ message: "Todo marked as completed" });
});

app.listen(3000, function () {
  console.log("Server listening to port 3000");
});
