import api from "./api";

interface LoginResponse {
  token: string;
}

export async function loginUser(username: string, password: string): Promise<LoginResponse> {
  const response = await api.post("/auth/login", {
    username,
    password,
  });

  return response.data;
}

export function logoutUser() {
  localStorage.removeItem("token");
}
