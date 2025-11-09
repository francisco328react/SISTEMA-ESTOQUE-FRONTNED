import { UserRow } from "./UserRow";
import { UserEmptyState } from "./UserEmptyState";
import type { User } from "../../types/User/User";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  return (
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
          {users.length > 0 ? (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onEdit={() => onEdit(user)}
                onDelete={() => onDelete(user.id)}
              />
            ))
          ) : (
            <UserEmptyState />
          )}
        </tbody>
      </table>
    </div>
  );
}
