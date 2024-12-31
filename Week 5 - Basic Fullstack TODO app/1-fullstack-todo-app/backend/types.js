const zod = require("zod");

// POST /add-todo
const addTodoSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
});

// PUT /completed
const completeTodoSchema = zod.object({
  id: zod.string(),
});

module.exports = {
  addTodoSchema,
  completeTodoSchema,
};
