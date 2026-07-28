// todoReducer.js

export const initialTodos = [];

export function todoReducer(state = initialTodos, action) {
  switch (action.type) {
    case "ADD_TODO": {
      const trimmedTask = action.payload.trim();

      if (!trimmedTask) return state;

      const newTodo = {
        id: Date.now(),
        text: trimmedTask,
        completed: false,
      };

      return [...state, newTodo];
    }

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "CLEAR_COMPLETED":
      return state.filter((todo) => !todo.completed);

    default:
      return state;
  }
}