import { getTodos } from "../data/todos.js";

export const getTodosList = (req, res) => {
  const todos = getTodos();
  res.json(todos);
}