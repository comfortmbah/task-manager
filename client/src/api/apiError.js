export async function handleApiResponse(response, errorMessage) {
  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
}