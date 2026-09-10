const API_URL = "http://localhost:5000/api/users";

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  const data = await response.json();

  return data;
}

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to get current user");
  }

  return response.json();
}