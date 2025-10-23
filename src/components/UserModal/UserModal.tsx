import { Register } from "../../pages/Register/Register";
import { X } from "lucide-react"
import type { User } from "../../types/User/User";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (user: User) => void;
}

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl pointer-events-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Cadastrar Usuário</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 font-bold cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Componente de cadastro */}
        <Register isModal onSave={onSave}/>
      </div>
    </div>
  );
};
