import type { User, UserFormData } from "../types/User/User";
import api from "./api";

export const userService = {
  // Listar todos os usuários
  async getAll(): Promise<User[]> {
    const response = await api.get("/users");
    return response.data;
  },

  // Buscar usuário por ID
  async getById(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Criar novo usuário
  async create(data: UserFormData): Promise<User> {
    const response = await api.post("/users", data);
    return response.data;
  },

  // Atualizar usuário
  async update(id: string, data: UserFormData): Promise<User> {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  // Deletar usuário
  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  // Ativar/Desativar usuário
  async toggleActive(id: string, active: boolean): Promise<User> {
    const response = await api.patch(`/users/${id}/toggle-active`, { active });
    return response.data;
  },
};
