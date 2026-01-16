export interface Material {
  id: string;
  referencia: string; // REF
  quantidade: number; // QTDE
  nome: string; // MATERIAL
  dataConferencia: string; // DATA DA CONFERENCIA
  modeloMaquina: string; // MODELO-MAQUINA
  fornecedor: string; // FORNECEDOR
  precoUnitario: number; // PREÇO UN
  estoque: string; // ESTOQUE (ELÉTRICA, ELÉTRICA/COMBUSTÃO, etc)
  estante: string; // ESTANTE (AA1, AA2, etc)
  estoqueMinimo?: number; // Para alertas
  observacoes?: string;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
}

export interface MaterialFormData {
  referencia: string;
  quantidade: number;
  nome: string;
  dataConferencia: string;
  modeloMaquina: string;
  fornecedor: string;
  precoUnitario: number;
  estoque: string;
  estante: string;
  estoqueMinimo?: number;
  observacoes?: string;
}

export interface MaterialFilters {
  busca?: string;
  estoque?: string;
  fornecedor?: string;
  estante?: string;
  estoqueAbaixoMinimo?: boolean;
}
