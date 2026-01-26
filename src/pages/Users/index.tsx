import { Edit, Search, Trash2, UserCheck, UserPlus, UserX } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";
import type { User } from "../../types/User/User";
import { SECTORS, SUBSIDIARIES, ROLES } from "../../types/User/User";

export const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [subsidiaryFilter, setSubsidiaryFilter] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      alert("Erro ao carregar usuários!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = users;

    if (search) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()) ||
          u.role.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (sectorFilter) {
      filtered = filtered.filter((u) => u.sector === sectorFilter);
    }

    if (subsidiaryFilter) {
      filtered = filtered.filter((u) => u.subsidiary === subsidiaryFilter);
    }

    setFilteredUsers(filtered);
  }, [search, sectorFilter, subsidiaryFilter, users]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await userService.delete(id);
        alert("Usuário excluído com sucesso!");
        loadUsers();
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        alert("Erro ao excluir usuário!");
      }
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await userService.toggleActive(id, !currentStatus);
      alert(
        `Usuário ${!currentStatus ? "ativado" : "desativado"} com sucesso!`,
      );
      loadUsers();
    } catch (error) {
      console.error("Erro ao alterar status:", error);
      alert("Erro ao alterar status do usuário!");
    }
  };

  const getRoleBadge = (role: string) => {
    const roleObj = ROLES.find((r) => r.value === role);
    const label = roleObj?.label || role;

    const colors: Record<string, string> = {
      Gerente: "bg-blue-100 text-blue-700",
      Estoquista: "bg-yellow-100 text-yellow-700",
      Operador: "bg-green-100 text-green-700",
      Supervisor: "bg-purple-100 text-purple-700",
      Auxiliar: "bg-gray-100 text-gray-700",
    };

    return (
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${
          colors[label] || "bg-gray-100 text-gray-700"
        }`}
      >
        {label}
      </span>
    );
  };

  const getSubsidiaryBadge = (subsidiary: string) => {
    const subObj = SUBSIDIARIES.find((s) => s.value === subsidiary);
    return (
      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-700">
        {subObj?.label || subsidiary}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Carregando usuários...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Usuários</h1>
          <p className="text-gray-600 mt-1">
            Gerenciamento de usuários do sistema
          </p>
        </div>
        <button
          onClick={() => navigate("/users/new")}
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition duration-200 shadow-lg"
        >
          <UserPlus className="w-5 h-5" />
          Novo Usuário
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Search className="w-4 h-4 inline mr-1" />
              Buscar
            </label>
            <input
              type="text"
              placeholder="Nome, email ou cargo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Setor
            </label>
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="">Todos</option>
              {SECTORS.map((sector) => (
                <option key={sector.value} value={sector.value}>
                  {sector.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filial
            </label>
            <select
              value={subsidiaryFilter}
              onChange={(e) => setSubsidiaryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="">Todas</option>
              {SUBSIDIARIES.map((sub) => (
                <option key={sub.value} value={sub.value}>
                  {sub.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm">
            <span className="text-gray-600">Total de usuários:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {filteredUsers.length}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Ativos:</span>
            <span className="ml-2 font-semibold text-green-600">
              {filteredUsers.filter((u) => u.active).length}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Inativos:</span>
            <span className="ml-2 font-semibold text-red-600">
              {filteredUsers.filter((u) => !u.active).length}
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
                  Nome
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Setor
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Cargo
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Filial
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    Nenhum usuário encontrado
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-gray-50 transition-colors ${!user.active ? "opacity-60" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {user.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {user.sector}
                    </td>
                    <td className="px-4 py-3">{getRoleBadge(user.sector)}</td>
                    <td className="px-4 py-3">
                      {getSubsidiaryBadge(user.subsidiary)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {user.active ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                          <UserCheck className="w-3 h-3" />
                          Ativo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                          <UserX className="w-3 h-3" />
                          Inativo
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => navigate(`/users/edit/${user.id}`)}
                          className="text-primary-600 hover:text-primary-800 transition"
                          title="Editar"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            handleToggleActive(user.id, user.active)
                          }
                          className={`${user.active ? "text-gray-600 hover:text-gray-800" : "text-green-600 hover:text-green-800"} transition`}
                          title={user.active ? "Desativar" : "Ativar"}
                        >
                          {user.active ? (
                            <UserX className="w-5 h-5" />
                          ) : (
                            <UserCheck className="w-5 h-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-800 transition"
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
    </div>
  );
};
