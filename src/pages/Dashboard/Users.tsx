import { useState } from "react";
import { UserModal } from "../../components/UserModal/UserModal";
import { UserHeader } from "../../components/UserHeader/UserHeader";
import { UserFilter } from "../../components/UserFilter/UserFilter";
import { UserCard } from "../../components/UserCard/UserCard";
import type { User } from "../../types/User/User";

export function Users() {

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

  const handleAddUser = (newUser: User) => setUsers((prev) => [...prev, newUser]);

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

        {filteredUsers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-16 text-lg">
            Nenhum usuário encontrado
          </p>
        )}
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddUser}
      />
    </div>
  );
};
