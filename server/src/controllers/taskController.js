import { getAllTasks, createTask, updateTask, deleteTask, deleteCompletedTask } from "../../models/taskModel.js";

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

export const deleteTaskController = async (req, res) => {
  const { id } = req.params;

  const task = await deleteTask(id);

  res.json(task);
}

export const deleteCompletedTasksController = async (req, res) => {
  const deletedTasks = await deleteCompletedTask();

  res.json(deletedTasks);
} 