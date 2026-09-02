import { createContext, useContext, useState, useReducer, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import todoReducer from '../reducers/todoReducer'


const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const inputRef = useRef(null);
  const [task, setTask] = useState("");
  const [todos, dispatch] = useReducer(todoReducer, [])
    
  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: "SET_TODOS",
        payload: data,
      });
    });
  }, []);
    
    function handleSubmit(e) {
      e.preventDefault();
  
      const trimmedTask = task.trim();
      if (!trimmedTask) return;
  
      dispatch({
        type: "ADD_TASK",
        payload: trimmedTask,
      });
  
      setTask("");

      inputRef.current.focus();
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
    <TodoContext.Provider
      value={{
        task,
        setTask,
        todos,
        handleSubmit,
        handleDelete,
        handleToggle,
        handleClearCompleted,
        inputRef,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

TodoProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export function useTodo() {
    return useContext(TodoContext);
}

  