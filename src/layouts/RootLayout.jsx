import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useState, useEffect, useReducer } from "react";
import  todoReducer  from "../reducers/todoReducer";

const RootLayout = () => {
  const [task, setTask] = useState("");
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
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

    dispatch({
      type: "ADD_TASK",
      payload: trimmedTask,
    });

    setTask("");
  }

  function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?")
    if (!confirmDelete) return;
    
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });

  };

  function handleToggle(id) {
    dispatch({
      type: "TOGGLE_TASK",
      payload: id,
    })
  };

  function handleClearCompleted() {
    const confirmClear = window.confirm("Are you sure you want to clear all completed tasks?");
    if (!confirmClear) return
    
    dispatch({
      type: "CLEAR_COMPLETED",
    })
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