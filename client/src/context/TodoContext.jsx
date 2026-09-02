import { createContext, useContext, useState, useReducer, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import todoReducer from '../reducers/todoReducer'
import { getTodos, createTodo, updateTodo, deleteTodo, deleteCompletedTodos } from '../api/todosApi';


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

      try {
        await deleteTodo(id);

        dispatch({
          type: "DELETE_TASK",
          payload: id,
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    async function handleToggle(id) {
      try {
        const updatedTodo = await updateTodo(id);

        dispatch({ 
          type: "TOGGLE_TASK",
          payload: updatedTodo,
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    async function handleClearCompleted() {
      const confirmClear = window.confirm("Are you sure you want to clear all completed tasks?");
      if (!confirmClear) return;

      try {
        const remainingTodos = await deleteCompletedTodos();

        dispatch({
          type: "SET_TODOS",
          payload: remainingTodos,
        })
      } catch (error) {
        console.error(error);
      }
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
  const context = useContext(TodoContext);

  console.log("TodoContext:", context);

  if (context === undefined) {
    throw new Error("useTodo must be used inside TodoProvider");
  }

  return context;
}

  