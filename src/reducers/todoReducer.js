export default function todoReducer(todos, action) {
    switch (action.type) {
        case "ADD_TASK":
            return [
              ...todos, {
                id: Date.now(),
                text: action.payload.trim(),
                completed: false,
              },
            ];
        
        case "DELETE_TASK":
            return todos.filter((todo) => todo.id !== action.payload);
        
        case "TOGGLE_TASK":
            return todos.map((todo) => 
                todo.id === action.payload
                  ? { ...todo, completed: !todo.completed } : todo
            );

        case "CLEAR-COMPLETED":
            return todos.filter((todo) => !todo.completed);
        
        default: 
          return todos;
    }
}