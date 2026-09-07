import { getAllTasks, createTask, updateTask } from "../../models/taskModel.js";

export const getTasks = async (req, res) => {
  const tasks = await getAllTasks();
  res.json(tasks);
}

export const createTaskController = async (req, res) => {
  const { text } = req.body;

  const task = await createTask(text);

  res.status(201).json(task);
}

export const updateTaskController = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const task = await updateTask(id, completed);

  res.json(task);
}

/*export const deleteTodo = (req, res) => {
  const { id } = req.params;
  const todos = getTodos();

  const todoIndex  = todos.findIndex((todo) => todo.id === Number(id));
  if (todoIndex === -1) {
    return res.status(404).json({
      message: "Todo not found"
    });
  }

  const deletedTodo = todos.splice(todoIndex, 1);
  res.json(deletedTodo[0]);
}

export const deleteCompletedTodo = (req, res) => {
  const todos = getTodos();
  const remainigTodos = todos.filter((todo) => !todo.completed);
  todos.length = 0;
  todos.push(...remainigTodos);

  res.json(todos);
} */