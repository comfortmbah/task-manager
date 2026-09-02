import { handleApiResponse } from "./apiError";
export const API_URL = "http://localhost:5000/api/todos";


export async function getTodos() {
  const response = await fetch(API_URL);
  
  return handleApiResponse(response, "Failed to fetch todos")
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

 return handleApiResponse(response, "Failed to create todo");
}

export async function updateTodo(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
  });

  return handleApiResponse(response, "Failed to update todo");
}

export async function deleteTodo(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return handleApiResponse(response, "Failed to delete todo")
}

export async function deleteCompletedTodos() {
  const response = await fetch(`${API_URL}/completed`, {
    method: "DELETE",
  });

  return handleApiResponse(response, "Failed to clear completed todos");
}