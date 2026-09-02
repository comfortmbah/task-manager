import { createContext, useContext, useState, useReducer, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import todoReducer from '../reducers/todoReducer'
import { API_URL } from '../api/todosApi';
import { getTodos, createTodo } from '../api/todosApi';


const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const inputRef = useRef(null);
  const [task, setTask] = useState("");
  const [todos, dispatch] = useReducer(todoReducer, [])
    
  useEffect(() => {
    getTodos()
    .then((data) => {
      dispatch({
        type: "SET_TODOS",
        payload: data,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);
    
    async function handleSubmit(e) {
      e.preventDefault();
  
      const trimmedTask = task.trim();
      if (!trimmedTask) return;

      try {
        const newTodo = await createTodo(trimmedTask);

        dispatch({
          type: "ADD_TASK",
          payload: newTodo,
        });
  
        setTask("");
      } catch (error) {
        console.error(error);
      }

      inputRef.current.focus();
    }
  
    async function handleDelete(id) {
      const confirmDelete = window.confirm("Are you sure you want to delete this task?")
      if (!confirmDelete) return;

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) return;
      
      dispatch({
        type: "DELETE_TASK",
        payload: id,
      });
  
    };
  
    async function handleToggle(id) {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
      });

      const updatedTodo = await response.json();

      dispatch({ 
        type: "TOGGLE_TASK",
        payload: updatedTodo,
      })
    };
  
    async function handleClearCompleted() {
      const confirmClear = window.confirm("Are you sure you want to clear all completed tasks?");
      if (!confirmClear) return

      const response = await fetch(`${API_URL}/completed`, {
        method: "DELETE",
      });

      if (!response.ok) return;

      const remainingTodos = await response.json();
      
      dispatch({
        type: "SET_TODOS",
        payload: remainingTodos,
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

  