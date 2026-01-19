import type { Material, MaterialFormData } from "../interfaces/material";
import api from "./api";

export const materialService = {
  // Listar todos os materiais
  async getAll(): Promise<Material[]> {
    const response = await api.get("/materials");
    return response.data;
  },

  // Buscar material por ID
  async getById(id: string): Promise<Material> {
    const response = await api.get(`/materials/${id}`);
    return response.data;
  },

  // Criar novo material
  async create(data: MaterialFormData): Promise<Material> {
    const response = await api.post("/materials", data);
    return response.data;
  },

  // Atualizar material
  async update(id: string, data: MaterialFormData): Promise<Material> {
    const response = await api.put(`/materials/${id}`, data);
    return response.data;
  },

  // Deletar material
  async delete(id: string): Promise<void> {
    await api.delete(`/materials/${id}`);
  },

  // Buscar com filtros
  async search(filters: {
    search?: string;
    stock?: string;
    supplier?: string;
    shelf?: string;
  }): Promise<Material[]> {
    const response = await api.get("/materials/search", { params: filters });
    return response.data;
  },

  // Ajustar quantidade (entrada/saída)
  async adjustQuantity(
    id: string,
    quantity: number,
    type: "entrada" | "saida",
  ): Promise<Material> {
    const response = await api.patch(`/materials/${id}/adjust`, {
      quantity,
      type,
    });
    return response.data;
  },
};
