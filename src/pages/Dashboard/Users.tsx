import { useState } from "react";
import { UserModal } from "../../components/UserModal/UserModal";
import { UserHeader } from "../../components/UserHeader/UserHeader";
import { UserFilter } from "../../components/UserFilter/UserFilter";
import { UserTable } from "../../components/UserTable/UserTable";
import type { User } from "../../types/User/User";

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"todos" | "gerente" | "estoquista">("todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "todos" || user.role === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAddUser = (newUser: User) => setUsers((prev) => [...prev, newUser]);
  const handleEditUser = (updatedUser: User) =>
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  const handleDeleteUser = (id: number) =>
    confirm("Tem certeza que deseja excluir este usuário?") &&
    setUsers((prev) => prev.filter((u) => u.id !== id));

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <UserHeader onNewUser={() => { setEditingUser(null); setIsModalOpen(true); }} />
        <UserFilter search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />

        <UserTable
          users={filteredUsers}
          onEdit={(user) => { setEditingUser(user); setIsModalOpen(true); }}
          onDelete={handleDeleteUser}
        />
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingUser(null); }}
        onSave={(user) => {
          if (editingUser) {
            handleEditUser(user);
          } else {
            handleAddUser(user);
          }
          setIsModalOpen(false);
        }}
        initialData={editingUser || undefined}
      />
    </div>
  );
}
