const API_BASE_URL = "http://localhost:8000";

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("renewai_token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export default API_BASE_URL;