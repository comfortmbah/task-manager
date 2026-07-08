import { useState, useEffect } from "react"

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
    <div>Home</div>
  )
}

export default Home