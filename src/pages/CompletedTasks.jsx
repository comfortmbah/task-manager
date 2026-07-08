import { useOutletContext } from 'react-router-dom'
import TodoList from '../components/TodoList'
import EmptyState from '../components/EmptyState'

const CompletedTasks = () => {
  const {
    todos,
    handleDelete,
    handleToggle,
  } = useOutletContext();

  const completedTasks = todos.filter((todo) => todo.completed);


  return (
    <section className='mx-auto max-w-3xl'>
      <div className='rounded-2xl bg-white p-6 shadow-lg'>
        <h1 className='mb-2 text-center text-3xl font-bold text-slate-800'>
          Completed Tasks
        </h1>

        <p className='mb-6 text-center text-slate-500'>
          {completedTasks.length} Completed Task
          {completedTasks.length !== 1 && 's'}
        </p>

        {completedTasks.length === 0 ? (
          <EmptyState />
        ) : (
          <TodoList
            todos={completedTasks}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        )}
      </div>
    </section>
  )
}

export default CompletedTasks