import { Edit, Minus, Package, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MaterialWithdrawModal } from "../../components/MaterialWithdrawModal/MaterialWithdrawModal";
import type { Material } from "../../interfaces/material";
import { materialService } from "../../services/materialService";

export const Materials: React.FC = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null,
  );

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
      alert("Erro ao carregar materiais!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = materials;

    if (search) {
      filtered = filtered.filter(
        (m) =>
          m.reference.toLowerCase().includes(search.toLowerCase()) ||
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.supplier.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (stockFilter) {
      filtered = filtered.filter((m) => m.stock === stockFilter);
    }

    if (supplierFilter) {
      filtered = filtered.filter((m) => m.supplier === supplierFilter);
    }

    setFilteredMaterials(filtered);
  }, [search, stockFilter, supplierFilter, materials]);

  const stocks = [...new Set(materials.map((m) => m.stock))];
  const suppliers = [...new Set(materials.map((m) => m.supplier))];

  const getQuantityColor = (quantity: number, minimum?: number) => {
    if (quantity === 0) return "text-red-600 font-bold";
    if (quantity <= 2) return "text-red-500 font-semibold";
    if (minimum && quantity <= minimum) return "text-yellow-600 font-semibold";
    return "text-gray-900";
  };

  const handleOpenWithdrawModal = (material: Material) => {
    setSelectedMaterial(material);
    setIsModalOpen(true);
  };

  const handleWithdraw = async (materialId: string, quantity: number) => {
    try {
      // Aqui você pode usar o endpoint adjustQuantity do materialService
      // ou criar um endpoint específico para retirada
      await materialService.adjustQuantity(materialId, quantity, "saida");
      alert(`${quantity} unidade(s) retirada(s) com sucesso!`);
      loadMaterials(); // Recarregar lista
    } catch (error) {
      console.error("Erro ao retirar material:", error);
      alert("Erro ao retirar material do estoque!");
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita abrir o modal ao clicar em delete
    if (window.confirm("Tem certeza que deseja excluir este material?")) {
      try {
        await materialService.delete(id);
        alert("Material excluído com sucesso!");
        loadMaterials();
      } catch (error) {
        console.error("Erro ao excluir material:", error);
        alert("Erro ao excluir material!");
      }
    }
  };

  const handleEdit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita abrir o modal ao clicar em editar
    navigate(`/materials/edit/${id}`);
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
          <Package className="w-5 h-5" />
          Novo Material
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Search className="w-4 h-4 inline mr-1" />
              Buscar
            </label>
            <input
              type="text"
              placeholder="REF, nome ou fornecedor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estoque
            </label>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="">Todos</option>
              {stocks.map((stock) => (
                <option key={stock} value={stock}>
                  {stock}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fornecedor
            </label>
            <select
              value={supplierFilter}
              onChange={(e) => setSupplierFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="">Todos</option>
              {suppliers.map((supplier) => (
                <option key={supplier} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm">
            <span className="text-gray-600">Total:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {filteredMaterials.length}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Crítico:</span>
            <span className="ml-2 font-semibold text-red-600">
              {filteredMaterials.filter((m) => m.quantity <= 2).length}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Valor total:</span>
            <span className="ml-2 font-semibold text-green-600">
              R${" "}
              {filteredMaterials
                .reduce((sum, m) => sum + m.quantity * m.unitPrice, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  REF
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  QTDE
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  MATERIAL
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  MODELO
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  FORNECEDOR
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  PREÇO UN
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  ESTOQUE
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  ESTANTE
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
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
                    onClick={() => handleOpenWithdrawModal(material)}
                    className="hover:bg-primary-50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {material.reference || "-"}
                    </td>
                    <td
                      className={`px-4 py-3 text-sm ${getQuantityColor(material.quantity, material.minimumStock)}`}
                    >
                      {material.quantity}
                      {material.quantity <= 2 && " ⚠️"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {material.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {material.machineModel || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {material.supplier || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      R$ {material.unitPrice}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {material.stock}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 font-mono">
                      {material.shelf}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenWithdrawModal(material);
                          }}
                          className="text-primary-600 hover:text-primary-800 transition p-1"
                          title="Retirar do estoque"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => handleEdit(material.id, e)}
                          className="text-gray-600 hover:text-gray-800 transition p-1"
                          title="Editar"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(material.id, e)}
                          className="text-red-600 hover:text-red-800 transition p-1"
                          title="Excluir"
                        >
                          <Trash2 className="w-5 h-5" />
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

      {/* Modal de Retirada */}
      <MaterialWithdrawModal
        material={selectedMaterial}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleWithdraw}
      />
    </div>
  );
};
