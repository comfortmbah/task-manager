import { createContext, useContext, useState, useReducer, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import todoReducer from '../reducers/todoReducer'
import { getTodos, createTodo, updateTodo, deleteTodo, deleteCompletedTodos } from '../api/todosApi';


const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const inputRef = useRef(null);
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [todos, dispatch] = useReducer(todoReducer, [])
    
  useEffect(() => {
    getTodos(4)
    .then((data) => {
      dispatch({
        type: "SET_TODOS",
        payload: data,
      });
    })
    .catch((error) => {
      console.error(error);
      setError(error.message);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);
    
    async function handleSubmit(e) {
      e.preventDefault();
  
      const trimmedTask = task.trim();
      if (!trimmedTask) return;

      try {
        setActionLoading(true);

        const newTodo = await createTodo(trimmedTask);

        dispatch({
          type: "ADD_TASK",
          payload: newTodo,
        });
  
        setTask("");
        setError("");
      } catch (error) {
        console.error(error);
        setError(error.message)
      } finally {
        setActionLoading(false);
      }

      inputRef.current.focus();
    }
  
    async function handleDelete(id) {
      const confirmDelete = window.confirm("Are you sure you want to delete this task?")
      if (!confirmDelete) return;

      try {
        setActionLoading(true);

        await deleteTodo(id);

        dispatch({
          type: "DELETE_TASK",
          payload: id,
        });

        setError("");
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setActionLoading(false);
      }
    };
  
    async function handleToggle(id) {
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) return;

      try {
        setActionLoading(true);

        const updatedTodo = await updateTodo(id, !todo.completed);

        dispatch({ 
          type: "TOGGLE_TASK",
          payload: updatedTodo,
        });

        setError("");
      } catch (error) {
        console.error(error);
        setError(error.message)
      } finally {
        setActionLoading(false);
      }
    };
  
    async function handleClearCompleted() {
      const confirmClear = window.confirm("Are you sure you want to clear all completed tasks?");
      if (!confirmClear) return;

      try {
        setActionLoading(true);

        const remainingTodos = await deleteCompletedTodos();

        dispatch({
          type: "SET_TODOS",
          payload: remainingTodos,
        })

        setError("");
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setActionLoading(false);
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
        error,
        loading,
        actionLoading,
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

  