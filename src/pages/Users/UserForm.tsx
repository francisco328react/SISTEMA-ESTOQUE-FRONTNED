import { ArrowLeft, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userService } from "../../services/userService";
import type { UserFormData } from "../../types/User/User";
import { ROLES, SECTORS, SUBSIDIARIES } from "../../types/User/User";

export const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    sector: "",
    role: "",
    subsidiary: "",
  });

  useEffect(() => {
    if (isEdit && id) {
      loadUser(id);
    }
  }, [id, isEdit]);

  const loadUser = async (userId: string) => {
    try {
      setLoading(true);
      const user = await userService.getById(userId);
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        sector: user.sector,
        role: user.role,
        subsidiary: user.subsidiary,
      });
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      alert("Erro ao carregar usuário!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("O nome é obrigatório!");
      return;
    }

    if (!formData.email.trim()) {
      alert("O email é obrigatório!");
      return;
    }

    if (!isEdit && !formData.password) {
      alert("A senha é obrigatória para novos usuários!");
      return;
    }

    if (!formData.sector) {
      alert("Selecione um setor!");
      return;
    }

    if (!formData.role) {
      alert("Selecione um cargo!");
      return;
    }

    if (!formData.subsidiary) {
      alert("Selecione uma filial!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Email inválido!");
      return;
    }

    if (formData.password && formData.password.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres!");
      return;
    }

    try {
      setLoading(true);

      const dataToSend = { ...formData };
      if (isEdit && !dataToSend.password) {
        delete dataToSend.password;
      }

      if (isEdit && id) {
        await userService.update(id, dataToSend);
        alert("Usuário atualizado com sucesso!");
      } else {
        await userService.create(dataToSend);
        alert("Usuário cadastrado com sucesso!");
      }
      navigate("/users");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro ao salvar usuário:", error);
      alert(error.response?.data?.message || "Erro ao salvar usuário!");
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Carregando usuário...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate("/users")}
          className="text-primary-600 hover:text-primary-700 flex items-center gap-2 mb-4 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para usuários
        </button>
        <h1 className="text-3xl font-bold text-gray-800">
          {isEdit ? "Editar Usuário" : "Novo Usuário"}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEdit
            ? "Atualize as informações do usuário"
            : "Preencha os dados para cadastrar um novo usuário"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="space-y-6">
          {/* Nome */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome Completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: João Silva"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemplo@empilhatec.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Senha {!isEdit && <span className="text-red-500">*</span>}
              {isEdit && (
                <span className="text-sm font-normal text-gray-500">
                  {" "}
                  (deixe vazio para manter a atual)
                </span>
              )}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={isEdit ? "••••••••" : "Mínimo 6 caracteres"}
              required={!isEdit}
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            />
            {!isEdit && (
              <p className="mt-1 text-sm text-gray-500">
                Mínimo de 6 caracteres
              </p>
            )}
          </div>

          {/* Grid com 3 campos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Setor */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Setor <span className="text-red-500">*</span>
              </label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              >
                <option value="">Selecione...</option>
                {SECTORS.map((sector) => (
                  <option key={sector.value} value={sector.value}>
                    {sector.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Cargo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cargo <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              >
                <option value="">Selecione...</option>
                {ROLES.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filial */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filial <span className="text-red-500">*</span>
              </label>
              <select
                name="subsidiary"
                value={formData.subsidiary}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              >
                <option value="">Selecione...</option>
                {SUBSIDIARIES.map((sub) => (
                  <option key={sub.value} value={sub.value}>
                    {sub.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-900 mb-1">
                  Informações importantes
                </h4>
                <p className="text-sm text-blue-800">
                  O usuário terá acesso ao sistema de acordo com a filial
                  selecionada. Certifique-se de escolher a filial correta
                  (Empilhatec ou Empilhacom).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            onClick={() => navigate("/users")}
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
