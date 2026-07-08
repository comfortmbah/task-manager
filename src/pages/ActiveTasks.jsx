import { useOutletContext } from "react-router-dom"
import TodoList from "../components/TodoList"
import EmptyState from "../components/EmptyState"
import { useEffect } from "react"

const ActiveTasks = () => {
  const {
    todos,
    handleDelete,
    handleToggle,
  } = useOutletContext();

  const activeTasks = todos.filter((todo) => !todo.completed);

  useEffect(() => {
    document.title = "TaskFlow | Active Tasks"
  }, []);


  return (
    <section className="mx-auto max-w-3xl">
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-slate-800">
          Active Tasks
        </h1>

        <p className="mb-6 text-center text-slate-500">
          {activeTasks.length} Active Task
          {activeTasks.length !== 1 && 's'}
        </p>

        {activeTasks.length === 0 ? (
          <EmptyState 
            title={'No Active Tasks'}
            message={"You're all caught up!"}
          />
        ) : (
          <TodoList
            todos={activeTasks}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        )}
      </div>
    </section>
  )
}

export default ActiveTasks