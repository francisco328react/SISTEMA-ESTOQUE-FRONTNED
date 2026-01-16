import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Material } from "../../interfaces/material";
import { materialService } from "../../services/materialService";

export const Materials: React.FC = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [busca, setBusca] = useState("");
  const [estoqueFilter, setEstoqueFilter] = useState("");
  const [fornecedorFilter, setFornecedorFilter] = useState("");
  const [estanteFilter, setEstanteFilter] = useState("");

  // Carregar materiais
  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    try {
      setLoading(true);
      const data = await materialService.getAll();
      setMaterials(data);
      setFilteredMaterials(data);
    } catch (error) {
      console.error("Erro ao carregar materiais:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar materiais
  useEffect(() => {
    let filtered = materials;

    // Filtro de busca
    if (busca) {
      filtered = filtered.filter(
        (m) =>
          m.referencia.toLowerCase().includes(busca.toLowerCase()) ||
          m.nome.toLowerCase().includes(busca.toLowerCase()) ||
          m.fornecedor.toLowerCase().includes(busca.toLowerCase())
      );
    }

    // Filtro de estoque
    if (estoqueFilter) {
      filtered = filtered.filter((m) => m.estoque === estoqueFilter);
    }

    // Filtro de fornecedor
    if (fornecedorFilter) {
      filtered = filtered.filter((m) => m.fornecedor === fornecedorFilter);
    }

    // Filtro de estante
    if (estanteFilter) {
      filtered = filtered.filter((m) => m.estante === estanteFilter);
    }

    setFilteredMaterials(filtered);
  }, [busca, estoqueFilter, fornecedorFilter, estanteFilter, materials]);

  // Obter valores únicos para filtros
  const estoques = [...new Set(materials.map((m) => m.estoque))];
  const fornecedores = [...new Set(materials.map((m) => m.fornecedor))];
  const estantes = [...new Set(materials.map((m) => m.estante))];

  // Função para determinar cor do estoque
  const getQuantidadeColor = (quantidade: number, minimo?: number) => {
    if (quantidade === 0) return "text-red-600 font-bold";
    if (quantidade === 1) return "text-red-500 font-semibold";
    if (minimo && quantidade <= minimo) return "text-yellow-600 font-semibold";
    return "text-gray-900";
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este material?")) {
      try {
        await materialService.delete(id);
        loadMaterials();
      } catch (error) {
        console.error("Erro ao excluir material:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Carregando materiais...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Materiais</h1>
          <p className="text-gray-600 mt-1">
            Gerenciamento de materiais em estoque
          </p>
        </div>
        <button
          onClick={() => navigate("/materials/new")}
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition duration-200 shadow-lg"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Novo Material
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Busca */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔍 Buscar
            </label>
            <input
              type="text"
              placeholder="REF, nome ou fornecedor..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Filtro Estoque */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estoque
            </label>
            <select
              value={estoqueFilter}
              onChange={(e) => setEstoqueFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="">Todos</option>
              {estoques.map((estoque) => (
                <option key={estoque} value={estoque}>
                  {estoque}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro Fornecedor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fornecedor
            </label>
            <select
              value={fornecedorFilter}
              onChange={(e) => setFornecedorFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="">Todos</option>
              {fornecedores.map((fornecedor) => (
                <option key={fornecedor} value={fornecedor}>
                  {fornecedor}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Estatísticas rápidas */}
        <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm">
            <span className="text-gray-600">Total de materiais:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {filteredMaterials.length}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Estoque crítico:</span>
            <span className="ml-2 font-semibold text-red-600">
              {filteredMaterials.filter((m) => m.quantidade <= 1).length}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Valor total:</span>
            <span className="ml-2 font-semibold text-green-600">
              R${" "}
              {filteredMaterials
                .reduce((sum, m) => sum + m.quantidade * m.precoUnitario, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  REF
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  QTDE
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  MATERIAL
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  MODELO
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  FORNECEDOR
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  PREÇO UN
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ESTOQUE
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ESTANTE
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  AÇÕES
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMaterials.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    Nenhum material encontrado
                  </td>
                </tr>
              ) : (
                filteredMaterials.map((material) => (
                  <tr
                    key={material.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {material.referencia || "-"}
                    </td>
                    <td
                      className={`px-4 py-3 text-sm ${getQuantidadeColor(
                        material.quantidade,
                        material.estoqueMinimo
                      )}`}
                    >
                      {material.quantidade}
                      {material.quantidade <= 1 && " ⚠️"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {material.nome}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {material.modeloMaquina || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {material.fornecedor || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      R$ {material.precoUnitario.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {material.estoque}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 font-mono">
                      {material.estante}
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Botão Ver */}
                        <button
                          onClick={() => navigate(`/materials/${material.id}`)}
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="Ver detalhes"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>

                        {/* Botão Editar */}
                        <button
                          onClick={() =>
                            navigate(`/materials/edit/${material.id}`)
                          }
                          className="text-primary-600 hover:text-primary-800 transition"
                          title="Editar"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>

                        {/* Botão Excluir */}
                        <button
                          onClick={() => handleDelete(material.id)}
                          className="text-red-600 hover:text-red-800 transition"
                          title="Excluir"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
