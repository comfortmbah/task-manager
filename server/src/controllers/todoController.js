import { getTodos } from "../data/todos.js";

export const getTodosList = (req, res) => {
  const todos = getTodos();
  res.json(todos);
}

export const createTodo = (req, res) => {
  const { text } = req.body;

  const todos = getTodos();

  if (!text || !text.trim()) {
    return res.status(400).json({
      message: "Task text is required"
    });
  }

  const newTodo = {
    id: Date.now(),
    text: text.trim(),
    completed: false,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
}