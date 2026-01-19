import { ArrowLeft, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { MaterialFormData } from "../../interfaces/material";
import { materialService } from "../../services/materialService";

export const MaterialForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<MaterialFormData>({
    reference: "",
    quantity: 0,
    name: "",
    conferenceDate: new Date().toISOString().split("T")[0],
    machineModel: "",
    supplier: "",
    unitPrice: 0,
    stock: "",
    shelf: "",
    minimumStock: 5,
    notes: "",
    active: true,
  });

  useEffect(() => {
    if (isEdit && id) {
      loadMaterial(id);
    }
  }, [id, isEdit]);

  const loadMaterial = async (materialId: string) => {
    try {
      setLoading(true);
      const material = await materialService.getById(materialId);
      setFormData({
        reference: material.reference,
        quantity: material.quantity,
        name: material.name,
        conferenceDate: material.conferenceDate.split("T")[0],
        machineModel: material.machineModel,
        supplier: material.supplier,
        unitPrice: material.unitPrice,
        stock: material.stock,
        shelf: material.shelf,
        minimumStock: material.minimumStock,
        notes: material.notes || "",
        active: material.active,
      });
    } catch (error) {
      console.error("Erro ao carregar material:", error);
      alert("Erro ao carregar material!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("O nome do material é obrigatório!");
      return;
    }

    if (formData.quantity < 0) {
      alert("A quantidade não pode ser negativa!");
      return;
    }

    if (formData.unitPrice < 0) {
      alert("O preço não pode ser negativo!");
      return;
    }

    try {
      setLoading(true);

      if (isEdit && id) {
        await materialService.update(id, formData);
        alert("Material atualizado com sucesso!");
      } else {
        await materialService.create(formData);
        alert("Material cadastrado com sucesso!");
      }
      navigate("/materials");
    } catch (error: any) {
      console.error("Erro ao salvar material:", error);
      alert(error.response?.data?.message || "Erro ao salvar material!");
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Carregando material...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate("/materials")}
          className="text-primary-600 hover:text-primary-700 flex items-center gap-2 mb-4 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para materiais
        </button>
        <h1 className="text-3xl font-bold text-gray-800">
          {isEdit ? "Editar Material" : "Novo Material"}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEdit
            ? "Atualize as informações do material"
            : "Preencha os dados para cadastrar um novo material"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="space-y-6">
          {/* Grid com 2 colunas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Referência
              </label>
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                placeholder="Ex: RV0405.0066"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome do Material <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: GIROFLEX DE LED 10-80V"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Grid com 3 colunas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantidade <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preço Unitário <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Estoque Mínimo
              </label>
              <input
                type="number"
                name="minimumStock"
                value={formData.minimumStock}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Grid com 2 colunas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fornecedor
              </label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                placeholder="Ex: LOGPARTS"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Modelo/Máquina
              </label>
              <input
                type="text"
                name="machineModel"
                value={formData.machineModel}
                onChange={handleChange}
                placeholder="Ex: VARIADOS"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Grid com 3 colunas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Estoque (Categoria)
              </label>
              <input
                type="text"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Ex: ELÉTRICA"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Estante
              </label>
              <input
                type="text"
                name="shelf"
                value={formData.shelf}
                onChange={handleChange}
                placeholder="Ex: AA1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Data de Conferência
              </label>
              <input
                type="date"
                name="conferenceDate"
                value={formData.conferenceDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Observações
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Observações adicionais..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate("/materials")}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
          >
            <Save className="w-5 h-5" />
            {loading ? "Salvando..." : isEdit ? "Atualizar" : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  );
};
