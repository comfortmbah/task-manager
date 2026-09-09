import { getAllTasks, createTask, updateTask, deleteTask, deleteCompletedTask } from "../models/taskModel.js";

export const getTasks = async (req, res) => {
  const userId = req.user.userId;
  const tasks = await getAllTasks(userId);
  res.json(tasks);
}

export const createTaskController = async (req, res) => {
  const { text } = req.body;
  const userId = req.user.userId;

  const task = await createTask(text, userId);

  res.status(201).json(task);
}

export const updateTaskController = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const userId = req.user.userId;

  const task = await updateTask(id, completed, userId);

  res.json(task);
}

export const deleteTaskController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const task = await deleteTask(id, userId);

  res.json(task);
}

export const deleteCompletedTasksController = async (req, res) => {
  const userId = req.user.userId;

  const deletedTasks = await deleteCompletedTask(userId);

  res.json(deletedTasks);
} 