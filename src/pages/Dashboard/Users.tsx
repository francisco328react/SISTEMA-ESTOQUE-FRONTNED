import { useEffect, useState } from "react";
import { UserModal } from "../../components/UserModal/UserModal";
import { UserHeader } from "../../components/UserHeader/UserHeader";
import { UserFilter } from "../../components/UserFilter/UserFilter";
import { UserTable } from "../../components/UserTable/UserTable";
import type { User } from "../../types/User/User";

import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../services/userService";

import {
  createAccess,
  updateAccess,
  deleteAccess,
} from "../../services/accessService";

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState<"todos" | "gerente" | "estoquista">("todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Carregar usuários
  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    }

    loadUsers();
  }, []);

  // Filtro por nome e tipo
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "todos" || user.role === filter;
    return matchesSearch && matchesFilter;
  });

  // Adicionar usuário no estado
  const handleAddUser = (newUser: User) => {
    setUsers((prev) => [...prev, newUser]);
  };

  // Atualizar usuário no estado
  const handleEditUser = (updated: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updated.id ? updated : u))
    );
  };

  // Excluir usuário
  const handleDeleteUser = async (id: string) => {
    if (!confirm("Deseja realmente excluir este usuário?")) return;

    try {
      // Precisamos apagar o ACCESS primeiro
      await deleteAccess(id);

      // Agora apagamos o USER
      await deleteUser(id);

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Erro ao excluir usuário.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <UserHeader
          onNewUser={() => {
            setEditingUser(null);
            setIsModalOpen(true);
          }}
        />

        <UserFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        <UserTable
          users={filteredUsers}
          onEdit={(user) => {
            setEditingUser(user);
            setIsModalOpen(true);
          }}
          onDelete={handleDeleteUser}
        />
      </div>

      {/* MODAL */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        initialData={editingUser || undefined}
        onSave={async ({ userData, accessData }) => {
          try {
            if (editingUser) {
              // ATUALIZAR USUÁRIO

              const updatedUser = await updateUser(editingUser.id, {
                name: userData.name,
                email: userData.email,
                sector: userData.sector,
                role: userData.role,
              });
              // ATUALIZAR CREDENCIAIS
              // Só atualiza se senha foi preenchida
              
              if (accessData.password.trim() !== "") {
                await updateAccess(editingUser.id, {
                  username: accessData.username,
                  password: accessData.password,
                  userId: editingUser.id,
                });
              }

              handleEditUser(updatedUser);
            } else {
              // CRIAR NOVO USUÁRIO
              
              const newUser = await createUser({
                name: userData.name,
                email: userData.email,
                sector: userData.sector,
                role: userData.role,
              });
              // CRIAR ACESSO

              await createAccess({
                username: accessData.username,
                password: accessData.password,
                userId: newUser.id,
              });

              handleAddUser(newUser);
            }

            setIsModalOpen(false);
            setEditingUser(null);
          } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar usuário.");
          }
        }}
      />
    </div>
  );
}
