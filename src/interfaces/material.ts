export interface Material {
  id: string;
  reference: string;
  quantity: number;
  name: string;
  conferenceDate: string;
  machineModel: string;
  supplier: string;
  unitPrice: number;
  stock: string;
  shelf: string;
  minimumStock?: number;
  notes?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialFormData {
  reference: string;
  quantity: number;
  name: string;
  conferenceDate: string;
  machineModel: string;
  supplier: string;
  unitPrice: number;
  stock: string;
  shelf: string;
  minimumStock?: number;
  notes?: string;
  active?: boolean;
}

export interface MaterialFilters {
  search?: string;
  stock?: string;
  supplier?: string;
  shelf?: string;
  belowMinimum?: boolean;
}
