import {
  AlertTriangle,
  Archive,
  ArrowRight,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const DashboardHome: React.FC = () => {
  const navigate = useNavigate();

  // Dados mocados
  const stats = {
    totalMaterials: 1247,
    totalValue: 156789.5,
    lowStock: 23,
    outOfStock: 5,
    thisMonthEntries: 145,
    thisMonthExits: 187,
  };

  const recentMaterials = [
    {
      id: "1",
      reference: "RV0405.0066",
      name: "GIROFLEX DE LED 10-80V",
      quantity: 5,
      minimumStock: 10,
      status: "low",
    },
    {
      id: "2",
      reference: "166298",
      name: "CILINDRO DE FREIO DA RODA",
      quantity: 0,
      minimumStock: 5,
      status: "out",
    },
    {
      id: "3",
      reference: "2895",
      name: "CONTACTOR SW180+48V",
      quantity: 1,
      minimumStock: 5,
      status: "critical",
    },
    {
      id: "4",
      reference: "RV0405.0015",
      name: "GIROFLEX 12-24V",
      quantity: 15,
      minimumStock: 10,
      status: "ok",
    },
    {
      id: "5",
      reference: "RV0405.0065",
      name: "RED ZONE",
      quantity: 2,
      minimumStock: 5,
      status: "low",
    },
  ];

  const categoryDistribution = [
    { name: "ELÉTRICA", value: 450, color: "bg-blue-500" },
    { name: "ELÉTRICA/COMBUSTÃO", value: 320, color: "bg-purple-500" },
    { name: "MECÂNICA", value: 280, color: "bg-green-500" },
    { name: "HIDRÁULICA", value: 150, color: "bg-yellow-500" },
    { name: "DIVERSOS", value: 47, color: "bg-gray-500" },
  ];

  const topSuppliers = [
    { name: "LOGPARTS", items: 234 },
    { name: "TVH", items: 189 },
    { name: "CHAMPS", items: 156 },
    { name: "PRADO SOM", items: 98 },
    { name: "TRACTO", items: 67 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "out":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
            Esgotado
          </span>
        );
      case "critical":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
            Crítico
          </span>
        );
      case "low":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
            Baixo
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
            OK
          </span>
        );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Visão geral do controle de estoque</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total de Materiais */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total de Materiais
              </p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {stats.totalMaterials.toLocaleString()}
              </h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-semibold">+12%</span>
            <span className="text-gray-500 ml-1">vs. mês anterior</span>
          </div>
        </div>

        {/* Valor Total em Estoque */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Valor em Estoque
              </p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                R${" "}
                {stats.totalValue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-semibold">+8%</span>
            <span className="text-gray-500 ml-1">vs. mês anterior</span>
          </div>
        </div>

        {/* Estoque Baixo */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Estoque Baixo</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {stats.lowStock}
              </h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <button
            onClick={() => navigate("/dashboard/materials")}
            className="flex items-center mt-4 text-sm text-yellow-600 hover:text-yellow-700 font-semibold"
          >
            Ver detalhes
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Esgotados */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Esgotados</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {stats.outOfStock}
              </h3>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <Archive className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <button
            onClick={() => navigate("/dashboard/materials")}
            className="flex items-center mt-4 text-sm text-red-600 hover:text-red-700 font-semibold"
          >
            Ver detalhes
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Movimentações do Mês */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Movimentações do Mês
          </h3>
          <div className="space-y-4">
            {/* Entradas */}
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 p-2 rounded-full">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Entradas</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.thisMonthEntries}
                  </p>
                </div>
              </div>
            </div>

            {/* Saídas */}
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-red-500 p-2 rounded-full">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Saídas</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.thisMonthExits}
                  </p>
                </div>
              </div>
            </div>

            {/* Saldo */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Saldo do Mês
                </span>
                <span className="text-lg font-bold text-red-600">
                  -{stats.thisMonthExits - stats.thisMonthEntries}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Distribuição por Categoria */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Distribuição por Categoria
          </h3>
          <div className="space-y-3">
            {categoryDistribution.map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {category.name}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {category.value}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${category.color} h-2 rounded-full transition-all duration-300`}
                    style={{
                      width: `${(category.value / stats.totalMaterials) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Fornecedores */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">
              Top Fornecedores
            </h3>
            <ShoppingCart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {topSuppliers.map((supplier, index) => (
              <div
                key={supplier.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary-100 text-primary-600 rounded-full font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-700">
                    {supplier.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {supplier.items} itens
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Materiais Críticos */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Materiais Críticos
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Materiais com estoque baixo ou esgotado
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/materials")}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
          >
            Ver Todos
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Referência
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Material
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                  Quantidade
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                  Mínimo
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentMaterials.map((material) => (
                <tr
                  key={material.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {material.reference}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {material.name}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`text-sm font-bold ${
                        material.quantity === 0
                          ? "text-red-600"
                          : material.quantity <= 2
                            ? "text-red-500"
                            : material.quantity < material.minimumStock
                              ? "text-yellow-600"
                              : "text-green-600"
                      }`}
                    >
                      {material.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600">
                    {material.minimumStock}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {getStatusBadge(material.status)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/materials/edit/${material.id}`)
                      }
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      Ajustar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
