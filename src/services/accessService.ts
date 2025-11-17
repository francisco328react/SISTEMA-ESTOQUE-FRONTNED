import api  from "./api";
import type { Access } from "../types/Access/Access";

export type AccessPayload = Pick<Access, "username" | "password" | "userId">;

export async function createAccess(data: AccessPayload) {
    const response = await api.post("/accesses", data, );
    return response.data;
}

export async function getAllAccess() {
    const response = await api.get("/accesses");
    return response.data;
}

export async function getAccessById(id: string) {
    const response = await api.get(`/accesses/${id}`);
    return response.data;
}

export async function updateAccess(id: string, data: AccessPayload) {
    const response = await api.put(`/accesses/${id}`, data, );
    return response.data;
}

export async function deleteAccess(id: string) {
    const response = await api.delete(`/accesses/${id}`, );
    return response.data;
}

export async function resetPassword(id: string) {
    const response = await api.patch(`/accesses/${id}/reset-password`);
    return response.data;
}