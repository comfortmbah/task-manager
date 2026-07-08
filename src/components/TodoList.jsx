import TodoItem from './TodoItem'

const TodoList = ({ todos, onDelete, onToggle }) => {
  return (
    <div className="space-y-4">
        {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              onDelete={onDelete}
              onToggle={onToggle}
            />
        ))}
    </div>
  )
}

export default TodoList