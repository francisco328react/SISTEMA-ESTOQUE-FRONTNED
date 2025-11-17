import api from "./api";
import type { User } from "../types/User/User";
import type { CreateUserDTO } from "../types/CreateUserDTO/CreateUserDTO";


export const createUser = async (data: CreateUserDTO): Promise<User> => {
  const response = await api.post("/users", data);
  return response.data;
}

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data;
};

export async function getUserId(id: string) {
  const response = await api.get<User>(`/users/${id}`, );
  return response.data;
}

export async function updateUser(id: string, data: Partial<User>) {
  const response = await api.put(`/users/${id}`, data, );
  return response.data;
}

export async function deleteUser(id: string) {
  const response = await api.delete(`/users/${id}`, );
  return response.data;
}