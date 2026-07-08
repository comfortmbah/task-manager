import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useState, useEffect } from "react";


const RootLayout = () => {
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

  function handleClearCompleted() {
    const confirmClear = window.confirm("Are you sure you want to clear all completed tasks?");
    if (!confirmClear) return
    setTodos((currentTodos) => 
      currentTodos.filter((todo) => !todo.completed)
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet
          context={{
            task,
            setTask,
            todos,
            handleSubmit,
            handleDelete,
            handleToggle,
            handleClearCompleted
          }}
        />
      </main>
    </div>
  )
}

export default RootLayout