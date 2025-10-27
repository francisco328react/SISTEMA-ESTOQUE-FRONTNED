import { useState } from "react";
import { UserModal } from "../../components/UserModal/UserModal";
import { UserHeader } from "../../components/UserHeader/UserHeader";
import { UserFilter } from "../../components/UserFilter/UserFilter";
import { Button } from "../../components/Button/Button";
import type { User } from "../../types/User/User";

export function Users() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Carlos Souza",
      email: "carlos@email.com",
      password: "123456",
      branch: "Empilhacom",
      role: "gerente",
      image: "https://ui-avatars.com/api/?name=Carlos+Souza",
      createdAt: "2025-10-15T10:30:00",
    },
    {
      id: 2,
      name: "Ana Lima",
      email: "ana@email.com",
      password: "654321",
      branch: "Empilhacom",
      role: "estoquista",
      image: "https://ui-avatars.com/api/?name=Ana+Lima",
      createdAt: "2025-10-16T09:15:00",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"todos" | "gerente" | "estoquista">("todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // --- Filtragem de usuários ---
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "todos" || user.role === filter;
    return matchesSearch && matchesFilter;
  });

  // --- Adicionar novo usuário ---
  const handleAddUser = (newUser: User) => {
    setUsers((prev) => [...prev, { ...newUser, id: Date.now() }]);
  };

  // --- Editar usuário existente ---
  const handleEditUser = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleDeleteUser = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  // --- Abrir modal para editar ---
  const openEditModal = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  // --- Fechar modal ---
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <UserHeader onNewUser={() => setIsModalOpen(true)} />

        <UserFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        {/* Lista de usuários */}
        <div className="mt-6 bg-white rounded-xl shadow overflow-hidden border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-6 py-3 font-semibold">Usuário</th>
                <th className="px-6 py-3 font-semibold">Cargo</th>
                <th className="px-6 py-3 font-semibold">Filial</th>
                <th className="px-6 py-3 font-semibold">E-mail</th>
                <th className="px-6 py-3 font-semibold text-center">Criado em</th>
                <th className="px-6 py-3 font-semibold text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-16 flex items-center gap-3">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize text-gray-600">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.branch}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-center text-gray-500 text-sm">
                      {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 flex items-center justify-center gap-5 text-center">
                      <Button
                        text="Editar"
                        variant="primary"
                        onClick={() => openEditModal(user)}
                      >
                        Editar
                      </Button>

                      <Button
                        text="Excluir"
                        variant="danger"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Excluir
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-500 text-lg"
                  >
                    Nenhum usuário encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Reutilizado */}
      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={(user) =>
          editingUser ? handleEditUser(user) : handleAddUser(user)
        }
        initialData={editingUser || undefined}
      />
    </div>
  );
}
