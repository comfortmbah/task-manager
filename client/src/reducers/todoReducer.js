export default function todoReducer(todos, action) {
    switch (action.type) {
        case "SET_TODOS": 
            return action.payload;

        case "ADD_TASK":
            return [
              ...todos, 
              action.payload,
            ];
        
        case "DELETE_TASK":
            return todos.filter((todo) => todo.id !== action.payload);
        
        case "TOGGLE_TASK":
            return todos.map((todo) => 
                todo.id === action.payload
                  ? { ...todo, completed: !todo.completed } : todo
            );

        case "CLEAR_COMPLETED":
            return todos.filter((todo) => !todo.completed);
        
        default: 
          return todos;
    }
}