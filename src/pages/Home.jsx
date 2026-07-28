import TodoList from "../components/TodoList";
import EmptyState from "../components/EmptyState";
import { useTodo } from "../context/TodoContext";
import TaskSummary from "../components/TaskSummary";
import { useEffect } from "react";

const Home = () => {
  const {
    task,
    setTask,
    todos,
    handleSubmit,
    handleDelete,
    handleToggle,
    handleClearCompleted
  } = useTodo();

  useEffect(() => {
    document.title = "TaskFlow | Home";
  }, []);

  const activeTasks = todos.filter((todo) => !todo.completed).length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  
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

        <TaskSummary 
          totalTasks={todos.length}
          activeTasks={activeTasks}
          completedTasks={completedTasks}
        />

        <button
          onClick={handleClearCompleted}
          disabled={!todos.some((todo) => todo.completed)}
          className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-600
            disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear Completed
        </button>

        <form
          onSubmit={handleSubmit}
          className="mb-6 flex flex-col gap-3 sm:flex-row mt-4"
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
          <EmptyState
            title={'No Tasks Yet'}
            message={'Add your first task to get started.'}
          />
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