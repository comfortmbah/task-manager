import { useState, useEffect } from "react"
import TodoList from "../components/TodoList";
import EmptyState from "../components/EmptyState";

const Home = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  })

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);
  
  function handleSubmit(e) {
    e.preventDefault();

    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    const newTodo = {
      id: Date.now(),
      text: trimmedTask,
      completed: false,
    };

    setTodos((currentTodos) => [ ...currentTodos, newTodo]);

    setTask("");
  }

  function handleDelete(id) {
    setTodos((currentTodos) => currentTodos.filter(
      (todo) => todo.id !== id
    ))
  };

  function handleToggle(id) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    })
  };

  return (
    <section className="mx-auto max-w-3xl">
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-slate-800">
          TaskFlow
        </h1>

        <p className="mb-6 text-center text-slate-500">
          {todos.length} Task
          {todos.length !== 1 && "s"}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mb-6 flex flex-col gap-3 sm:flex-row"
        >
          <input 
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-800"
          />

          <button
            type="submit"
            disabled={!task.trim()}
            className="rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-700
              disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add Task
          </button>
        </form>

        {todos.length === 0 ? (
          <EmptyState />
        ) : (
          <TodoList 
            todos={todos}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        )}
      </div>
    </section>
  )
}

export default Home