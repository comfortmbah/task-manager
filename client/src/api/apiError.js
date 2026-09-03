export async function handleApiResponse(response, errorMessage) {
  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || errorMessage);
  }

  return response.json();
} 