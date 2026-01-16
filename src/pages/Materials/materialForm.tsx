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
    referencia: "",
    quantidade: 0,
    nome: "",
    dataConferencia: new Date().toISOString().split("T")[0],
    modeloMaquina: "",
    fornecedor: "",
    precoUnitario: 0,
    estoque: "",
    estante: "",
    estoqueMinimo: 5,
    observacoes: "",
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
        referencia: material.referencia,
        quantidade: material.quantidade,
        nome: material.nome,
        dataConferencia: material.dataConferencia.split("T")[0],
        modeloMaquina: material.modeloMaquina,
        fornecedor: material.fornecedor,
        precoUnitario: material.precoUnitario,
        estoque: material.estoque,
        estante: material.estante,
        estoqueMinimo: material.estoqueMinimo,
        observacoes: material.observacoes,
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
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" ? (value === "" ? 0 : parseFloat(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações básicas
    if (!formData.nome.trim()) {
      alert("O nome do material é obrigatório!");
      return;
    }

    if (formData.quantidade < 0) {
      alert("A quantidade não pode ser negativa!");
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
    } catch (error) {
      console.error("Erro ao salvar material:", error);
      alert("Erro ao salvar material!");
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
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/materials")}
          className="text-primary-600 hover:text-primary-700 flex items-center gap-2 mb-4"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
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

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Referência */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Referência
            </label>
            <input
              type="text"
              name="referencia"
              value={formData.referencia}
              onChange={handleChange}
              placeholder="Ex: RV0405.0066"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Nome do Material */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome do Material <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: GIROFLEX DE LED 10-80V"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Quantidade */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quantidade <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              min="0"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Estoque Mínimo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Estoque Mínimo
            </label>
            <input
              type="number"
              name="estoqueMinimo"
              value={formData.estoqueMinimo}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Modelo/Máquina */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Modelo/Máquina
            </label>
            <input
              type="text"
              name="modeloMaquina"
              value={formData.modeloMaquina}
              onChange={handleChange}
              placeholder="Ex: VARIADOS, RV50-16"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Fornecedor */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fornecedor
            </label>
            <input
              type="text"
              name="fornecedor"
              value={formData.fornecedor}
              onChange={handleChange}
              placeholder="Ex: LOGPARTS, TVH"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Preço Unitário */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preço Unitário (R$)
            </label>
            <input
              type="number"
              name="precoUnitario"
              value={formData.precoUnitario}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Data da Conferência */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Data da Conferência
            </label>
            <input
              type="date"
              name="dataConferencia"
              value={formData.dataConferencia}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Estoque (Categoria) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Estoque (Categoria)
            </label>
            <select
              name="estoque"
              value={formData.estoque}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="">Selecione...</option>
              <option value="ELÉTRICA">ELÉTRICA</option>
              <option value="ELÉTRICA/COMBUSTÃO">ELÉTRICA/COMBUSTÃO</option>
              <option value="MECÂNICA">MECÂNICA</option>
              <option value="HIDRÁULICA">HIDRÁULICA</option>
              <option value="DIVERSOS">DIVERSOS</option>
            </select>
          </div>

          {/* Estante */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Estante
            </label>
            <input
              type="text"
              name="estante"
              value={formData.estante}
              onChange={handleChange}
              placeholder="Ex: AA1, AA2, BB1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Observações */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Observações
            </label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              rows={4}
              placeholder="Informações adicionais sobre o material..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate("/materials")}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Salvando..." : isEdit ? "Atualizar" : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  );
};
