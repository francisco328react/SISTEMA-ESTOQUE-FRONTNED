export interface User {
  id: string;
  name: string;
  email: string;
  sector: string; // setor
  role: string; // cargo
  subsidiary: string; // filial
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  sector: string; // setor
  role: string; // cargo
  subsidiary: string; // filial
}

export interface UserFilters {
  search?: string;
  sector?: string;
  role?: string;
  subsidiary?: string;
  active?: boolean;
}

// Lista de setores
export const SECTORS = [
  { value: "Administração", label: "Administração" },
  { value: "Estoque", label: "Estoque" },
  { value: "Vendas", label: "Vendas" },
  { value: "Manutenção", label: "Manutenção" },
  { value: "Operações", label: "Operações" },
] as const;

// Lista de cargos
export const ROLES = [
  { value: "Gerente", label: "Gerente" },
  { value: "Estoquista", label: "Estoquista" },
  { value: "Operador", label: "Operador" },
  { value: "Supervisor", label: "Supervisor" },
  { value: "Auxiliar", label: "Auxiliar" },
] as const;

// Lista de filiais
export const SUBSIDIARIES = [
  { value: "empilhatec", label: "Empilhatec" },
  { value: "empilhacom", label: "Empilhacom" },
] as const;
