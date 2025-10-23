import { useState } from "react";
import type { User } from "../../types/User/User";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
}

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("Francisco");
  const [role, setRole] = useState("estoquista");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name,
      role,
      createdAt: new Date().toISOString(),
      image: '../../assets/Perfil-2.jpg',
    };
    onSave(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Cadastrar Usuário</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nome completo"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="gerente">Gerente</option>
            <option value="estoquista">Estoquista</option>
          </select>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
