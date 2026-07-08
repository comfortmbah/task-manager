

const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <div 
      className="flex items-center justify-between rounded-xl border border-slate-200
      bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-5 w-5 cursor-pointer accent-slate-900"
        />

        <p className={`text-lg font-medium ${todo.completed
            ? "text-slate-400 line-through" : "text-slate-800"
        }`}>
            {todo.text}
        </p>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  )
}

export default TodoItem