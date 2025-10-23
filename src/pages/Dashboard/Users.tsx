// src/pages/Dashboard/Users.tsx
import { useState } from "react";
import { UserModal } from "../../components/UserModal/UserModal";

export interface User {
  id: number;
  name: string;
  role: string;
  image: string;
  createdAt: string;
}

export const Users = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Carlos Souza",
      role: "gerente",
      image: "https://ui-avatars.com/api/?name=Carlos+Souza",
      createdAt: "2025-10-15T10:30:00",
    },
    {
      id: 2,
      name: "Ana Lima",
      role: "estoquista",
      image: "https://ui-avatars.com/api/?name=Ana+Lima",
      createdAt: "2025-10-16T09:15:00",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"todos" | "gerente" | "estoquista">("todos");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "todos" || user.role === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAddUser = (newUser: User) => setUsers([...users, newUser]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Usuários</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Novo Usuário
        </button>
      </div>

      <div className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="Pesquisar usuário..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1 focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "todos" | "gerente" | "estoquista")
          }
          className="border border-gray-300 rounded px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          <option value="todos">Todos</option>
          <option value="gerente">Gerente</option>
          <option value="estoquista">Estoquista</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.image}
                alt={user.name}
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Criado em: {new Date(user.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </div>
        ))}
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddUser}
      />
    </div>
  );
};
