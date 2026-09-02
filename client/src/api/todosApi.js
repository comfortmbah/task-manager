export const API_URL = "http://localhost:5000/api/todos";

export async function getTodos() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch todos")
  }

  return response.json();
}

export async function createTodo(text) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  return response.json();
}

export async function updateTodo(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
}

export async function deleteTodo(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }

  return response.json();
}