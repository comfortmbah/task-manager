const todos = [
  {
    id: 1,
    text: "Learn Express",
    completed: false,
  },
  {
    id: 2,
    text: "Build a REST API",
    completed: false,
  },
  {
    id: 3,
    text: "Connect React to Express",
    completed: true,
  },
];

export const getTodos = () => {
  return todos;
}