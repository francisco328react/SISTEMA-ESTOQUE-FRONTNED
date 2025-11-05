import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { FormField } from "../FormField/FormField";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
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
    role: "gerente",
    image: "",
    createdAt: new Date().toISOString(),
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Atualiza dados do formulário ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          id: 0,
          name: "",
          email: "",
          password: "",
          branch: "",
          role: "gerente",
          image: "",
          createdAt: new Date().toISOString(),
        });
      }
      setErrors({});
    }
  }, [initialData, isOpen]);

  // 🔤 Atualiza campos e limpa erros ao digitar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ✅ Validação de campos obrigatórios
  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "O nome é obrigatório.";
    if (!formData.email.trim()) newErrors.email = "O e-mail é obrigatório.";
    if (!formData.password.trim()) newErrors.password = "A senha é obrigatória.";
    if (!formData.branch.trim()) newErrors.branch = "A filial é obrigatória.";
    if (!formData.role.trim()) newErrors.role = "O tipo de usuário é obrigatório.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Salvar usuário (novo ou edição)
  const handleSave = () => {
    if (!validateFields()) return;

    const userToSave: User = {
      ...formData,
      id: formData.id || Date.now(),
      image: formData.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}`,
      createdAt: formData.createdAt || new Date().toISOString(),
    };

    onSave(userToSave);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {initialData ? "Editar Usuário" : "Novo Usuário"}
        </h2>

        <div className="space-y-4">
          <FormField label="Nome" error={errors.name}>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite o nome"
            />
          </FormField>

          <FormField label="E-mail" error={errors.email}>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite o e-mail"
            />
          </FormField>

          <FormField label="Senha" error={errors.password}>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Digite a senha"
            />
          </FormField>

          <FormField label="Filial" error={errors.branch}>
            <Select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              options={[
                { label: "Empilhacom", value: "Empilhacom" },
                { label: "Empilhatec", value: "Empilhatec" },
              ]}
            />
          </FormField>

          <FormField label="Tipo de Usuário" error={errors.role}>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={[
                { label: "Gerente", value: "gerente" },
                { label: "Estoquista", value: "estoquista" },
              ]}
            />
          </FormField>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button text="Cancelar" variant="secondary" onClick={onClose} />
          <Button
            text={initialData ? "Salvar Alterações" : "Cadastrar Usuário"}
            variant="primary"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
