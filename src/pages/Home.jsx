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

  
  return (
    <div>Home</div>
  )
}

export default Home