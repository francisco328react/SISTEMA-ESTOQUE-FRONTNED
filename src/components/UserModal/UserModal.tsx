import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import type { User } from "../../types/User/User";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  initialData?: User;
}

export function UserModal({ isOpen, onClose, onSave, initialData }: UserModalProps) {
  const [formData, setFormData] = useState<User>({
    id: 0,
    name: "",
    email: "",
    password: "",
    branch: "",
    role: "",
    image: "",
    createdAt: new Date().toISOString(),
  });

  // Quando for editar, preencher os campos automaticamente
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Resetar formulário se for um novo usuário
      setFormData({
        id: 0,
        name: "",
        email: "",
        password: "",
        branch: "",
        role: "",
        image: "",
        createdAt: new Date().toISOString(),
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const userToSave = {
      ...formData,
      image: formData.image || `https://ui-avatars.com/api/?name=${formData.name}`,
      createdAt: formData.createdAt || new Date().toISOString(),
      id: formData.id || Date.now(),
    };

    onSave(userToSave);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
        
        {/* Título dinâmico */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {initialData ? "Editar Usuário" : "Novo Usuário"}
        </h2>

        {/* Formulário */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o nome"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o e-mail"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a senha"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Filial</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Empilhacom"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Tipo de Usuário</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              <option value="gerente">Gerente</option>
              <option value="estoquista">Estoquista</option>
            </select>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3 mt-6">
          {/* <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {initialData ? "Salvar Alterações" : "Cadastrar Usuário"}
          </Button> */}
          <Button text="Cancelar" variant="secondary" onClick={onClose} />
          <Button text={initialData ? "Salvar Alterações" : "Cadastrar Usuário"} variant="primary" onClick={handleSave} />

        </div>
      </div>
    </div>
  );
}
