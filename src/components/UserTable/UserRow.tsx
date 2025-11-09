import { Button } from "../Button/Button";
import type { User } from "../../types/User/User";

interface UserRowProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

export function UserRow({ user, onEdit, onDelete }: UserRowProps) {
  return (
    <tr className="border-t hover:bg-gray-50 transition">
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
      <td className="px-6 py-4 capitalize text-gray-600">{user.role}</td>
      <td className="px-6 py-4 text-gray-600">{user.branch}</td>
      <td className="px-6 py-4 text-gray-600">{user.email}</td>
      <td className="px-6 py-4 text-center text-gray-500 text-sm">
        {new Date(user.createdAt).toLocaleDateString("pt-BR")}
      </td>
      <td className="px-6 py-4 flex items-center justify-center gap-5 text-center">
        <Button text="Editar" variant="primary" onClick={onEdit} />
        <Button text="Excluir" variant="danger" onClick={onDelete} />
      </td>
    </tr>
  );
}
